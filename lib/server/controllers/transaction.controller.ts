import Koa from 'koa'
import {
  GetTransactionsParams,
  GetTransactionsResponseBody,
} from '../../types/api/transaction.types'
import { AuthedContext } from '../../types/controller'
import { Item } from '../db/entities/Item'
import { Transaction } from '../db/entities/Transaction'

interface GetTransactionsRequest extends Koa.Request {
  body: GetTransactionsParams
}

interface GetTransactionsContext extends AuthedContext {
  request: GetTransactionsRequest
  body: GetTransactionsResponseBody
}

const getTransactions = async (ctx: GetTransactionsContext, next) => {
  const { user } = ctx
  if (user.groupId) {
    const items = await Item.find({ where: { groupId: user.groupId } })
    const transactions = await Transaction.createQueryBuilder('transaction')
      .where('transaction.itemId IN (:itemIds)', {
        itemIds: items.map(r => r.id),
      })
      .getMany()
    ctx.status = 200
    ctx.body = {
      transactions: transactions.map(txn => txn.toObjectForClient()),
    }
  } else {
    ctx.status = 204
    ctx.body = { transactions: [] }
  }
}

const transactionController = {
  getTransactions,
}

export default transactionController
