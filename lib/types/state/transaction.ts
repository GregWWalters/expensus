import { Transaction } from '../../server/db/entities/Transaction'
import { ApiState } from '../index'

export interface TransactionForClient {
  id: Transaction['id']
  transactionId: Transaction['transactionId']
  amount: Transaction['amount']
  category: Transaction['category']
  categoryId: Transaction['categoryId']
  date: Transaction['date']
  location: Transaction['location']
  name: Transaction['name']
  paymentMeta: Transaction['paymentMeta']
  pending: Transaction['pending']
  pendingTransactionId: Transaction['pendingTransactionId']
  accountOwner: Transaction['accountOwner']
  transactionType: Transaction['transactionType']
  accountId: Transaction['accountId']
  itemId: Transaction['itemId']
}

export default interface TransactionState {
  loadTransactions: ApiState
  transactions: ReadonlyArray<TransactionForClient>
}
