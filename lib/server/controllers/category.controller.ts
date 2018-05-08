import Koa from 'koa'
import {
  CreateCategoryParams,
  CreateCategoryResponseBody,
  DeleteCategoryParams,
  GetCategoriesResponseBody,
  UpdateCategoryParams,
  UpdateCategoryResponseBody,
} from '../../types/api/category'
import { GroupAuthedContext } from '../../types/controller'
import { Category } from '../db/entities/Category'

interface GetCategoriesContext extends GroupAuthedContext {
  body: GetCategoriesResponseBody
}

const getCategories = async (ctx: GetCategoriesContext, next) => {
  const { group } = ctx
  const categories = await Category.findWithChildrenForGroup(group)
  ctx.body = {
    categories: categories.map(category => category.toObjectForClient()),
  }
  ctx.status = categories.length > 0 ? 200 : 204
}

interface CreateCategoryRequest extends Koa.Request {
  body: CreateCategoryParams
}

interface CreateCategoryContext extends GroupAuthedContext {
  request: CreateCategoryRequest
  body: CreateCategoryResponseBody
}

const createCategory = async (ctx: CreateCategoryContext, next) => {
  const { group } = ctx
  const { name, parentId } = ctx.request.body

  try {
    const category = new Category()
    category.groupId = group.id
    category.name = name
    category.parentId = parentId || null
    await category.save()

    const newCategory = await Category.findWithChildrenById(category.id)
    if (!newCategory) throw new Error('Reloaded transaction not found')

    ctx.body = { category: newCategory.toObjectForClient() }
    ctx.status = 201
  } catch (error) {
    console.log(
      `Error creating category: ${name}, parent: ${parentId}, for group: ${group}, err: ${error}`
    )
    ctx.status = 500
  }
}

interface UpdateCategoryRequest extends Koa.Request {
  body: UpdateCategoryParams
}

interface UpdateCategoryContext extends GroupAuthedContext {
  request: UpdateCategoryRequest
  body: UpdateCategoryResponseBody
}

const updateCategory = async (ctx: UpdateCategoryContext, next) => {
  const { group } = ctx
  const { category } = ctx.request.body
  const categoryToUpdate = await Category.findOne(category.id)
  if (!categoryToUpdate) return ctx.throw(404)
  if (categoryToUpdate.groupId !== group.id) return ctx.throw(401)
  try {
    categoryToUpdate.name = category.name
    categoryToUpdate.parentId = category.parentId
    await categoryToUpdate.save()

    const updatedCategory = await Category.findWithChildrenById(category.id)
    if (!updatedCategory) throw new Error('Reloaded transaction not found')
    ctx.body = { category: updatedCategory.toObjectForClient() }
    ctx.status = 201
  } catch (error) {
    console.log(`Error updating category: ${categoryToUpdate}, err: ${error}`)
    ctx.status = 500
  }
}

interface DeleteCategoryRequest extends Koa.Request {
  body: DeleteCategoryParams
}

interface DeleteCategoryContext extends GroupAuthedContext {
  request: DeleteCategoryRequest
  body: {}
}

const deleteCategory = async (ctx: DeleteCategoryContext, next) => {
  const { group } = ctx
  const { id } = ctx.request.body
  const categoryToDelete = await Category.findOne(id)
  if (!categoryToDelete) return ctx.throw(404)
  if (categoryToDelete.groupId !== group.id) return ctx.throw(401)
  const children = await Category.find({ where: { parentId: id } })
  if (children.length > 0) {
    return ctx.throw(422, 'Cannot delete category with children')
  }
  try {
    await categoryToDelete.remove()
    ctx.status = 204
  } catch (error) {
    console.log(`Error deleting category: ${categoryToDelete}, err: ${error}`)
    ctx.status = 500
  }
}

const CategoryController = {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
}

export default CategoryController
