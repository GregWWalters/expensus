import { createAction } from 'redux-act'
import { ThunkAction } from 'redux-thunk'
import { RequestState } from '../../types'
import { ClientApiError } from '../../types/api'
import State from '../../types/state'
import { UserForClient } from '../../types/state/user'
import UserResource from '../api/resources/user'
import { STORAGE_TOKEN_KEY } from '../constants'
import UserRequiredError from '../errors/UserRequiredError'
import { selectLoadUserStatus, selectUser } from '../state/selectors/userState'
import { loginSuccess, setApiToken } from './AuthActions'
import { fetchBooks } from './BookActions'
import { getCategories } from './CategoryActions'
import { fetchGroup } from './GroupActions'
import { fetchItems } from './ItemActions'
import { fetchTransactions } from './TransactionActions'

// === Basic Actions
export const setUser = createAction<UserForClient>('SET_USER')
export const loadUser = createAction('LOAD_USER')
export const loadUserError = createAction<ClientApiError>('LOAD_USER_ERROR')

// === Async Actions and Thunks
export const fetchUser = (): ThunkAction<Promise<void>, State, null> => async (
  dispatch,
  getState
) => {
  // if we're already fetching the user, dont fetch again
  if (selectLoadUserStatus(getState()) === RequestState.REQUESTING) return
  // if there's no token, we can't use the token to 'login'
  const token = localStorage.getItem(STORAGE_TOKEN_KEY)
  if (!token) return
  dispatch(setApiToken(token))

  dispatch(loadUser())
  const userApi = new UserResource(getState(), dispatch)
  const resp = await userApi.fetchUser()

  if ('err' in resp) {
    // token probably invalid or expired
    // either way safest to have user login again
    dispatch(loadUserError(resp.err))
    localStorage.removeItem(STORAGE_TOKEN_KEY)
    return
  }

  // update token in case it has changed
  localStorage.setItem(STORAGE_TOKEN_KEY, resp.apiToken)
  dispatch(setApiToken(resp.apiToken))
  dispatch(setUser(resp.user))
  dispatch(loginSuccess())
  dispatch(bootstrapUser())
}

export const bootstrapUser = (): ThunkAction<
  Promise<void>,
  State,
  null
> => async (dispatch, getState) => {
  const state = getState()
  const user = selectUser(state)
  if (!user) throw new UserRequiredError('User required to bootstrap')
  if (user.groupId) {
    await dispatch(fetchGroup())
    dispatch(fetchItems())
    dispatch(fetchTransactions())
    dispatch(fetchBooks())
    dispatch(getCategories())
  }
}
