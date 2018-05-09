import Router from 'koa-router'
import UserController from '../controllers/user'

const user = new Router()

user.get('/me', UserController.fetchUser)

export default user
