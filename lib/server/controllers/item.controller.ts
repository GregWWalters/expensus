import Koa from 'koa'
import {
  CreateItemParams,
  CreateItemResponseBody,
} from '../../types/api/item.types'
import ItemService from '../services/item.service'

interface CreateItemRequest extends Koa.Request {
  body: CreateItemParams
}
interface CreateItemContext extends Koa.Context {
  request: CreateItemRequest
  body: CreateItemResponseBody
}

const createItem = async (ctx: CreateItemContext, next) => {
  const { publicToken, groupId } = ctx.request.body
  const itemService = new ItemService(groupId)
  const newItem = await itemService.createNewItem(publicToken)

  ctx.body = { item: newItem.toObjectForClient() }
  ctx.status = 201
}

const ItemController = {
  createItem,
}

export default ItemController
