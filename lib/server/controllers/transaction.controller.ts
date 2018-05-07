import Koa from 'koa'
import {
  GetTransactionsParams,
  GetTransactionsResponseBody,
  UpdateTransactionParams,
  UpdateTransactionResponseBody,
} from '../../types/api/transaction'
import { GroupAuthedContext } from '../../types/controller'
import { Item } from '../db/entities/Item'
import { Transaction } from '../db/entities/Transaction'
import { allocateTransaction } from '../services/transaction.service'

interface GetTransactionsRequest extends Koa.Request {
  body: GetTransactionsParams
}

interface GetTransactionsContext extends GroupAuthedContext {
  request: GetTransactionsRequest
  body: GetTransactionsResponseBody
}

const getTransactions = async (ctx: GetTransactionsContext, next) => {
  const { group } = ctx
  const items = await Item.find({ where: { groupId: group.id } })
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
}

interface UpdateTransactionRequest extends Koa.Request {
  body: UpdateTransactionParams
}

interface UpdateTransactionContext extends GroupAuthedContext {
  request: UpdateTransactionRequest
  body: UpdateTransactionResponseBody
}

const updateTransaction = async (ctx: UpdateTransactionContext, next) => {
  const { group } = ctx
  const { transaction, newAllocations } = ctx.request.body

  const transactionToUpdate = await Transaction.findOne(transaction.id)
  if (!transactionToUpdate) return ctx.throw(404, 'Transaction not found')

  const items = await Item.find({ where: { groupId: group.id } })
  if (!items.map(item => item.id).includes(transactionToUpdate.itemId)) {
    return ctx.throw(401)
  }

  let updatedTransaction = transactionToUpdate

  if (newAllocations) {
    updatedTransaction = await allocateTransaction(
      transactionToUpdate,
      newAllocations
    )
  }

  ctx.status = 200
  ctx.body = { transaction: updatedTransaction.toObjectForClient() }
}

const transactionController = {
  getTransactions,
  updateTransaction,
}

export default transactionController
