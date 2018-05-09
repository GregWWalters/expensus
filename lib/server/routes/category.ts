import Router from 'koa-router'
import CategoryController from '../controllers/category'

const category = new Router()
category.get('/', CategoryController.getCategories)
category.post('/create', CategoryController.createCategory)
category.put('/:id/update', CategoryController.updateCategory)
category.delete('/:id/delete', CategoryController.deleteCategory)

export default category
