import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { RequestState } from '../../../types'
import TransactionState from '../../../types/state/transaction'
import {
  loadTransactions,
  loadTransactionsError,
  setTransactions,
} from '../../actions/TransactionActions'
import { transactionState } from '../defaultState'

// === Combined TransactionState reducer
const transactionsReducer = createReducer<TransactionState['transactions']>(
  {},
  []
)
const loadTransactionReducer = createReducer<
  TransactionState['loadTransactions']
>({}, transactionState.loadTransactions)

const transactionStateReducer = combineReducers({
  loadTransaction: loadTransactionReducer,
  transactions: transactionsReducer,
})
export default transactionStateReducer

// === Transaction Reducer Handlers
transactionsReducer.on(setTransactions, (state, transactions) => transactions)

// === Transaction Status Reducer Handlers
loadTransactionReducer.on(setTransactions, (state, transaction) => ({
  error: null,
  status: RequestState.COMPLETED,
}))

loadTransactionReducer.on(loadTransactions, state => ({
  error: null,
  status: RequestState.REQUESTING,
}))

loadTransactionReducer.on(loadTransactionsError, (state, error) => ({
  error,
  status: RequestState.ERROR,
}))
