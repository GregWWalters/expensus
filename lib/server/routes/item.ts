import Router from 'koa-router'
import ItemController from '../controllers/item'

const item = new Router()

item.get('/', ItemController.getItems)
item.post('/create', ItemController.createItem)
export default item
