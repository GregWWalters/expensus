import Router from 'koa-router'
import { jwtAuth } from '../middleware/auth.middleware'
import auth from './auth.routes'
import group from './group.routes'

const router = new Router()
router.use('/auth', auth.routes(), auth.allowedMethods())
router.use(jwtAuth)
router.use('/group', group.routes(), group.allowedMethods())

export default router
