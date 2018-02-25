import { createAction } from 'redux-act'
import { ThunkAction } from 'redux-thunk'
import { ClientApiError } from '../../types/api'
import State from '../../types/state'
import { UserForClient } from '../../types/state/user'
import UserResource from '../api/resources/user.resource'
import { STORAGE_TOKEN_KEY } from '../constants'
import { selectUserStatus } from '../state/selectors/userState'
import { loginSuccess, setApiToken } from './AuthActions'

// === Basic Actions
export const setUser = createAction<UserForClient>('SET_USER')
export const fetchingUser = createAction('FETCHING_USER')
export const fetchUserError = createAction<ClientApiError>('FETCH_USER_ERROR')

// === Async Actions and Thunks
export const fetchUser = (): ThunkAction<Promise<void>, State, null> => async (
  dispatch,
  getState
) => {
  const state = getState()

  // if we're already fetching the user, dont fetch again
  if (selectUserStatus(state) === 'loading') return
  // if there's no token, we can't use the token to 'login'
  const token = localStorage.getItem(STORAGE_TOKEN_KEY)
  if (!token) return
  dispatch(setApiToken(token))

  dispatch(fetchingUser())
  const userApi = new UserResource(state, dispatch)
  const resp = await userApi.fetchUser()

  if ('err' in resp) {
    dispatch(fetchUserError(resp.err))
    return
  }

  // update token in case it has changed
  localStorage.setItem(STORAGE_TOKEN_KEY, resp.apiToken)
  dispatch(setApiToken(resp.apiToken))
  dispatch(setUser(resp.user))
  dispatch(loginSuccess())
}
