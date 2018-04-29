import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { RequestState } from '../../../types'
import TransactionState from '../../../types/state/transaction'
import {
  closeEditTransactionModal,
  loadTransactions,
  loadTransactionsError,
  openEditTransactionModal,
  setTransactions,
  submitTransaction,
  submitTransactionError,
  updateTransaction,
} from '../../actions/TransactionActions'
import { transactionState } from '../defaultState'

// === Combined TransactionState reducer
const editTransactionModalOpenReducerFor = createReducer<number | null>(
  {},
  null
)
const transactionsReducer = createReducer<TransactionState['transactions']>(
  {},
  []
)
const loadTransactionsReducer = createReducer<
  TransactionState['loadTransactions']
>({}, transactionState.loadTransactions)
const submitTransactionReducer = createReducer<
  TransactionState['loadTransactions']
>({}, transactionState.submitTransaction)

const transactionStateReducer = combineReducers({
  editTransactionModalOpenFor: editTransactionModalOpenReducerFor,
  loadTransactions: loadTransactionsReducer,
  submitTransaction: submitTransactionReducer,
  transactions: transactionsReducer,
})
export default transactionStateReducer

// === Edit Transaction Modal Open
editTransactionModalOpenReducerFor.on(
  openEditTransactionModal,
  (state, id) => id
)
editTransactionModalOpenReducerFor.on(closeEditTransactionModal, state => null)

// === Load Transaction Status Reducer Handlers
loadTransactionsReducer.on(setTransactions, (state, transaction) => ({
  error: null,
  status: RequestState.COMPLETED,
}))

loadTransactionsReducer.on(loadTransactions, state => ({
  error: null,
  status: RequestState.REQUESTING,
}))

loadTransactionsReducer.on(loadTransactionsError, (state, error) => ({
  error,
  status: RequestState.ERROR,
}))

// === Submit Transaction Status Reducer Handlers
submitTransactionReducer.on(updateTransaction, (state, transactions) => ({
  error: null,
  status: RequestState.COMPLETED,
}))

submitTransactionReducer.on(updateTransaction, (state, transaction) => ({
  error: null,
  status: RequestState.COMPLETED,
}))

submitTransactionReducer.on(submitTransaction, state => ({
  error: null,
  status: RequestState.REQUESTING,
}))

submitTransactionReducer.on(submitTransactionError, (state, error) => ({
  error,
  status: RequestState.ERROR,
}))

submitTransactionReducer.on(closeEditTransactionModal, state => ({
  ...state,
  status: RequestState.NOT_REQUESTED,
}))

// === Transactions Reducer Handlers
transactionsReducer.on(setTransactions, (state, transactions) => transactions)

transactionsReducer.on(updateTransaction, (transactions, transaction) => {
  // TODO: do we need to handle a case where the transaction isnt in the list yet?
  return transactions.map(
    txn => (txn.id === transaction.id ? transaction : txn)
  )
})
