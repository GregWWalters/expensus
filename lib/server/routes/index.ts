import Router from 'koa-router'
import { jwtAuth, loadGroup, loadUser } from '../middleware/auth'
import auth from './auth'
import book from './book'
import category from './category'
import group from './group'
import item from './item'
import transaction from './transaction'
import user from './user'
import webhook from './webhook'

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
