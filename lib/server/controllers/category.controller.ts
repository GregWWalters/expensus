import Koa from 'koa'
import { GetCategoriesResponseBody } from '../../types/api/category'
import { AuthedContext } from '../../types/controller'

interface GetCategoriesContext extends AuthedContext {
  body: GetCategoriesResponseBody
}

const getCategories = async (ctx: GetCategoriesContext, next) => {
  const { user } = ctx
}
