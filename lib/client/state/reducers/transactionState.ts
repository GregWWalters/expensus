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
  submitTransactions,
  submitTransactionsError,
} from '../../actions/TransactionActions'
import { transactionState } from '../defaultState'

// === Combined TransactionState reducer
const editTransactionModalOpenReducer = createReducer<boolean>({}, false)
const transactionsReducer = createReducer<TransactionState['transactions']>(
  {},
  []
)
const loadTransactionsReducer = createReducer<
  TransactionState['loadTransactions']
>({}, transactionState.loadTransactions)
const submitTransactionsReducer = createReducer<
  TransactionState['loadTransactions']
>({}, transactionState.submitTransactions)

const transactionStateReducer = combineReducers({
  editTransactionModalOpen: editTransactionModalOpenReducer,
  loadTransactions: loadTransactionsReducer,
  submitTransactions: submitTransactionsReducer,
  transactions: transactionsReducer,
})
export default transactionStateReducer

// === Edit Transaction Modal Open
editTransactionModalOpenReducer.on(openEditTransactionModal, state => true)
editTransactionModalOpenReducer.on(closeEditTransactionModal, state => false)

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
submitTransactionsReducer.on(setTransactions, (state, transaction) => ({
  error: null,
  status: RequestState.COMPLETED,
}))

submitTransactionsReducer.on(submitTransactions, state => ({
  error: null,
  status: RequestState.REQUESTING,
}))

submitTransactionsReducer.on(submitTransactionsError, (state, error) => ({
  error,
  status: RequestState.ERROR,
}))

// === Transactions Reducer Handlers
transactionsReducer.on(setTransactions, (state, transactions) => transactions)
