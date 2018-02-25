import Router from 'koa-router'
import GroupController from '../controllers/group.controller'

const group = new Router()

group.get('/', GroupController.getGroup)
group.post('/create', GroupController.createGroup)
export default group
