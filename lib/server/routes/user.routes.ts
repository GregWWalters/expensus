import Router from 'koa-router'
import UserController from '../controllers/user.controller'

const user = new Router()

user.get('/me', UserController.fetchUser)

export default user
