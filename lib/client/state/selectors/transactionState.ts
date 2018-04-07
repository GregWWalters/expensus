import { createSelector } from 'reselect'
import State from '../../../types/state'
import { TransactionForClient } from '../../../types/state/transaction'

export const selectTransactionState = (state: State) => state.transactionState

export const selectLoadTransactions = createSelector(
  selectTransactionState,
  transactionState => transactionState.loadTransactions
)

export const selectTransactions = createSelector(
  selectTransactionState,
  transactionState => transactionState.transactions
)

export const selectIsEditTransactionModalOpen = createSelector(
  selectTransactionState,
  transactionState => transactionState.editTransactionModalOpen
)

// === Transaction Helper functions
export function isTransactionFullyAllocated(
  txn: TransactionForClient
): boolean {
  if (!txn.allocations) return false
  return txn.allocations.reduce((sum, al) => sum + al.amount, 0) === txn.amount
}
