import { createAction } from 'redux-act'
import { ThunkAction } from 'redux-thunk'
import { ClientApiError } from '../../types/api'
import { UpdateTransactionParams } from '../../types/api/transaction'
import State from '../../types/state'
import { TransactionForClient } from '../../types/state/transaction'
import TransactionResource from '../api/resources/transaction'
import GroupRequiredError from '../errors/GroupRequiredError'
import UserRequiredError from '../errors/UserRequiredError'
import { selectUser } from '../state/selectors/userState'

export const loadTransactions = createAction('LOAD_TRANSACTIONS')
export const loadTransactionsError = createAction<ClientApiError>(
  'LOAD_TRANSACTIONS_ERROR'
)
export const submitTransaction = createAction('SUBMIT_TRANSACTION')
export const submitTransactionError = createAction<ClientApiError>(
  'SUBMIT_TRANSACTION_ERROR'
)
export const updateTransaction = createAction<TransactionForClient>(
  'UPDATE_TRANSACTION'
)
export const setTransactions = createAction<
  ReadonlyArray<TransactionForClient>
>('SET_TRANSACTIONS')
export const openEditTransactionModal = createAction<number>(
  'OPEN_EDIT_TRANSACTION_MODAL'
)
export const closeEditTransactionModal = createAction(
  'CLOSE_EDIT_TRANSACTION_MODAL'
)

export const fetchTransactions = (): ThunkAction<
  Promise<void>,
  State,
  null
> => async (dispatch, getState) => {
  const user = selectUser(getState())
  if (!user) throw new UserRequiredError('User required to get items')
  if (!user.groupId) {
    throw new GroupRequiredError('Group required to get items')
  }

  dispatch(loadTransactions())
  const transactionApi = new TransactionResource(getState(), dispatch)
  const resp = await transactionApi.getTransactions()

  if ('err' in resp) {
    dispatch(loadTransactionsError(resp.err))
    return
  }

  dispatch(setTransactions(resp.transactions))
}

export const submitUpdateTransactionRequest = (
  params: UpdateTransactionParams
): ThunkAction<Promise<void>, State, null> => async (dispatch, getState) => {
  const user = selectUser(getState())
  if (!user) throw new UserRequiredError('User required to update items')
  if (!user.groupId) {
    throw new GroupRequiredError('Group required to update items')
  }

  // TODO: make this specific to a single transaction id
  dispatch(submitTransaction())
  const transactionApi = new TransactionResource(getState(), dispatch)
  const resp = await transactionApi.updateTransaction(params)

  if ('err' in resp) {
    dispatch(submitTransactionError(resp.err))
    return
  }

  dispatch(updateTransaction(resp.transaction))
}
