import { createAction } from 'redux-act'
import { ThunkAction } from 'redux-thunk'
import { LoginParams, SignupParams } from '../../types/api/auth.types'
import State from '../../types/state'
import req from '../api/req'
import {
  selectLoginSubmitting,
  selectSignupSubmitting,
} from '../state/selectors/auth'

// BASIC ACTIONS
export const setApiToken = createAction<string>('SET_API_TOKEN')
export const loginSubmit = createAction('LOGIN_SUBMIT')
export const loginSuccess = createAction('LOGIN_SUCCESS')
export const loginError = createAction<string>('LOGIN_ERROR')
export const clearLoginState = createAction('CLEAR_LOGIN_STATE')
export const signupSubmit = createAction('SIGNUP_SUBMIT')
export const signupSuccess = createAction('SIGNUP_SUCCESS')
export const signupError = createAction<string>('SIGNUP_ERROR')
export const clearSignupState = createAction('CLEAR_SIGNUP_STATE')

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
  const resp = await req.post('/auth/login', params)
  console.log('Response: ', resp)
  dispatch(loginSuccess())
}

export const submitSignup = (
  params: SignupParams
): ThunkAction<Promise<void>, State, null> => async (dispatch, getState) => {
  const state = getState()
  if (selectSignupSubmitting(state)) return

  dispatch(signupSubmit())
  try {
    const resp = await req.post('/auth/signup', params)
    console.log('Response: ', resp)
    dispatch(signupSuccess())
  } catch (e) {
    console.log('error: ', e)
  }
}
