import Router from 'koa-router'
import { Login, Signup } from '../services/auth.service'

const auth = new Router()

auth.post('/login', Login)

auth.post('/signup', Signup)

export default auth
