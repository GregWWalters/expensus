import Router from 'koa-router'
import ItemController from '../controllers/item.controller'

const item = new Router()

item.post('/create', ItemController.createItem)
export default item
