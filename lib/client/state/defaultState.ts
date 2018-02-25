import AuthState from '../../types/state/auth'
import State from '../../types/state/index'

export const auth: AuthState = {
  apiToken: '',
  loginError: null,
  loginSubmitting: false,
  loginSuccess: false,
  signupError: null,
  signupSubmitting: false,
  signupSuccess: false,
}

export const user = null

export const group = null

const defaultState: State = {
  auth,
  group,
  user,
}

export default defaultState
