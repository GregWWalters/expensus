import Router from 'koa-router'
import { jwtAuth } from '../middleware/auth.middleware'
import auth from './auth.routes'
import group from './group.routes'
import user from './user.routes'

const router = new Router()

// === Unprotected Routes
router.use('/auth', auth.routes(), auth.allowedMethods())

// === Protected Routes
router.use(jwtAuth)
router.use('/group', group.routes(), group.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())

export default router
