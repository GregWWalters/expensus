import Router from 'koa-router'
import TransactionController from '../controllers/transaction.controller'

const transaction = new Router()

transaction.get('/', TransactionController.getTransactions)
export default transaction
