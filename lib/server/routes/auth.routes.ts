import Router from 'koa-router'
import AuthController from '../controllers/auth.controller'

const auth = new Router()

auth.post('/login', AuthController.login)
auth.post('/signup', AuthController.signup)

export default auth
