import Router from 'koa-router'
import auth from './auth.routes'

const router = new Router()
router.use('/auth', auth.routes(), auth.allowedMethods())

export default router
