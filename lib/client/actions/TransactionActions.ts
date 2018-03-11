import { createAction } from 'redux-act'
import { ClientApiError } from '../../types/api'
import { TransactionForClient } from '../../types/state/transaction'

export const loadTransactions = createAction('LOAD_TRANSACTIONS')
export const loadTransactionsError = createAction<ClientApiError>(
  'LOAD_TRANSACTIONS_ERROR'
)
export const setTransactions = createAction<
  ReadonlyArray<TransactionForClient>
>('SET_TRANSACTIONS')
