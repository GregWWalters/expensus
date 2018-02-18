import { createReducer } from 'redux-act'
import State from '../../../types/state'
import * as actions from '../../actions/AuthActions'
import { auth as defaultState } from '../defaultState'

const authReducer = createReducer<State['auth']>({}, defaultState)
export default authReducer

authReducer.on(actions.setApiToken, (state, apiToken) => ({
  ...state,
  apiToken,
}))

authReducer.on(actions.loginSubmit, state => ({
  ...state,
  loginError: null,
  loginSubmitting: true,
  loginSuccess: false,
}))

authReducer.on(actions.loginSuccess, state => ({
  ...state,
  loginError: null,
  loginSubmitting: false,
  loginSuccess: true,
}))

authReducer.on(actions.clearLoginState, state => ({
  ...state,
  loginError: null,
  loginSubmitting: false,
  loginSuccess: false,
}))

authReducer.on(actions.loginError, (state, error) => ({
  ...state,
  loginSubmitting: false,
  loginSuccess: false,
  loginError: error,
}))

authReducer.on(actions.signupSubmit, state => ({
  ...state,
  signupError: null,
  signupSubmitting: true,
  signupSuccess: false,
}))

authReducer.on(actions.signupSuccess, state => ({
  ...state,
  signupError: null,
  signupSubmitting: false,
  signupSuccess: true,
}))

authReducer.on(actions.signupError, (state, error) => ({
  ...state,
  signupSubmitting: false,
  signupSuccess: false,
  signupError: error,
}))

authReducer.on(actions.clearSignupState, state => ({
  ...state,
  signupError: null,
  signupSubmitting: false,
  signupSuccess: false,
}))
