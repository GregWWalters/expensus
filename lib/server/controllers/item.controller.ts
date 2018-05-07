import Koa from 'koa'
import {
  CreateItemParams,
  CreateItemResponseBody,
  GetItemsResponseBody,
} from '../../types/api/item'
import { AuthedContext } from '../../types/controller'
import { Item } from '../db/entities/Item'
import ItemService from '../services/item.service'

interface CreateItemRequest extends Koa.Request {
  body: CreateItemParams
}
interface CreateItemContext extends AuthedContext {
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

interface GetItemsContext extends AuthedContext {
  body: GetItemsResponseBody
}

const getItems = async (ctx: GetItemsContext, next) => {
  const { group } = ctx
  const items = await Item.find({ where: { groupId: group.id } })
  ctx.status = items.length > 0 ? 200 : 204
  ctx.body = { items: items.map(item => item.toObjectForClient()) }
}

const ItemController = {
  createItem,
  getItems,
}

export default ItemController
