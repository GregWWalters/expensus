import Router from 'koa-router'
import TransactionController from '../controllers/transaction'

const transaction = new Router()

transaction.get('/', TransactionController.getTransactions)
transaction.put(
  '/:transactionId/update',
  TransactionController.updateTransaction
)
export default transaction
