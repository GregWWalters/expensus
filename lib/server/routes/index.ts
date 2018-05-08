import Router from 'koa-router'
import { jwtAuth, loadGroup, loadUser } from '../middleware/auth.middleware'
import auth from './auth.routes'
import book from './book.routes'
import category from './category.routes'
import group from './group.routes'
import item from './item.routes'
import transaction from './transaction.routes'
import user from './user.routes'
import webhook from './webhook.routes'

const router = new Router()

// === Unprotected Routes
router.use('/auth', auth.routes(), auth.allowedMethods())
router.use('/webhook', webhook.routes(), webhook.allowedMethods())

// === User Protected Routes
router.use(jwtAuth)
router.use(loadUser)
router.use('/user', user.routes(), user.allowedMethods())
router.use('/group', group.routes(), group.allowedMethods())

// === Group Protected Routes
router.use(loadGroup)
router.use('/item', item.routes(), item.allowedMethods())
router.use('/transaction', transaction.routes(), transaction.allowedMethods())
router.use('/book', book.routes(), book.allowedMethods())
router.use('/category', category.routes(), category.allowedMethods())

export default router
