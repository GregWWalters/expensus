import Koa from 'koa'
import {
  GetTransactionsParams,
  GetTransactionsResponseBody,
  UpdateTransactionParams,
  UpdateTransactionResponseBody,
} from '../../types/api/transaction.types'
import { AuthedContext } from '../../types/controller'
import { Item } from '../db/entities/Item'
import { Transaction } from '../db/entities/Transaction'
import { allocateTransaction } from '../services/transaction.service'

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
      .leftJoinAndSelect('transaction.allocations', 'allocation')
      .where('transaction.itemId IN (:...itemIds)', {
        itemIds: items.map(r => r.id),
      })
      .orderBy('date', 'DESC')
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

interface UpdateTransactionRequest extends Koa.Request {
  body: UpdateTransactionParams
}

interface UpdateTransactionContext extends AuthedContext {
  request: UpdateTransactionRequest
  body: UpdateTransactionResponseBody
}

const updateTransaction = async (ctx: UpdateTransactionContext, next) => {
  const { user } = ctx
  const { transaction, newAllocations } = ctx.request.body
  if (!user.groupId) {
    return ctx.throw(403, 'Group required to update transaction')
  }

  const transactionToUpdate = await Transaction.findOne(transaction.id)
  if (!transactionToUpdate) return ctx.throw(404, 'Transaction not found')

  const items = await Item.find({ where: { groupId: user.groupId } })
  if (!items.map(item => item.id).includes(transactionToUpdate.itemId)) {
    return ctx.throw(401)
  }

  let txn = transactionToUpdate

  if (newAllocations) {
    txn = await allocateTransaction(transactionToUpdate, newAllocations)
  }

  ctx.status = 200
  ctx.body = { transaction: txn.toObjectForClient() }
}

const transactionController = {
  getTransactions,
  updateTransaction,
}

export default transactionController
