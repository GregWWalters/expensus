import { createAction } from 'redux-act'
import { ThunkAction } from 'redux-thunk'
import { ClientApiError } from '../../types/api'
import { LoginParams, SignupParams } from '../../types/api/auth.types'
import State from '../../types/state'
import req from '../api/req'
import AuthResource from '../api/resources/auth.resource'
import { STORAGE_TOKEN_KEY } from '../constants'
import {
  selectLoginSubmitting,
  selectSignupSubmitting,
} from '../state/selectors/auth'
import { setUser } from './UserActions'

// BASIC ACTIONS
export const setApiToken = createAction<string>('SET_API_TOKEN')
export const loginSubmit = createAction('LOGIN_SUBMIT')
export const loginSuccess = createAction('LOGIN_SUCCESS')
export const loginError = createAction<ClientApiError>('LOGIN_ERROR')
export const clearLoginState = createAction('CLEAR_LOGIN_STATE')
export const signupSubmit = createAction('SIGNUP_SUBMIT')
export const signupSuccess = createAction('SIGNUP_SUCCESS')
export const signupError = createAction<ClientApiError>('SIGNUP_ERROR')
export const clearSignupState = createAction('CLEAR_SIGNUP_STATE')
export const logout = createAction('LOGOUT')

// THUNK ACTIONS
export const authenticateApi = (
  token: string
): ThunkAction<void, State, null> => (dispatch, getState) => {
  if (!token) return
  req.defaults.headers.common.Authorization = `Bearer ${token}`
  dispatch(setApiToken(token))
}

export const submitLogin = (
  params: LoginParams
): ThunkAction<Promise<void>, State, null> => async (dispatch, getState) => {
  const state = getState()
  if (selectLoginSubmitting(state)) return
  dispatch(loginSubmit())
  const authApi = new AuthResource(state, dispatch)
  const resp = await authApi.login(params)

  if ('err' in resp) {
    dispatch(loginError(resp.err))
    return
  }

  localStorage.setItem(STORAGE_TOKEN_KEY, resp.apiToken)
  dispatch(setApiToken(resp.apiToken))
  dispatch(setUser(resp.user))
  dispatch(loginSuccess())
}

export const submitSignup = (
  params: SignupParams
): ThunkAction<Promise<void>, State, null> => async (dispatch, getState) => {
  const state = getState()
  if (selectSignupSubmitting(state)) return
  dispatch(signupSubmit())
  const authApi = new AuthResource(state, dispatch)
  const resp = await authApi.signup(params)

  if ('err' in resp) {
    dispatch(signupError(resp.err))
    return
  }

  localStorage.setItem(STORAGE_TOKEN_KEY, resp.apiToken)
  dispatch(setApiToken(resp.apiToken))
  dispatch(setUser(resp.user))
  dispatch(signupSuccess())
}

export const triggerLogout = (): ThunkAction<
  Promise<void>,
  State,
  null
> => async (dispatch, getState) => {
  localStorage.removeItem(STORAGE_TOKEN_KEY)
  // TODO: is there a better way to do this? this seems simple and complete
  window.location.reload()
}
