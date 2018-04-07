import { Transaction } from '../../server/db/entities/Transaction'
import { AllocationForClient } from '../Allocation'
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
  allocations: ReadonlyArray<AllocationForClient>
}

export default interface TransactionState {
  editTransactionModalOpen: boolean
  loadTransactions: ApiState
  submitTransactions: ApiState
  transactions: ReadonlyArray<TransactionForClient>
}
