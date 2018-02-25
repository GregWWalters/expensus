import AuthState from '../../types/state/auth'
import GroupState from '../../types/state/group'
import State from '../../types/state/index'
import UserState from '../../types/state/user'

export const auth: AuthState = {
  apiToken: '',
  loginError: null,
  loginSubmitting: false,
  loginSuccess: false,
  signupError: null,
  signupSubmitting: false,
  signupSuccess: false,
}

export const userState: UserState = {
  status: 'not loaded',
  user: null,
}

export const groupState: GroupState = {
  status: 'not loaded',
  group: null,
}

const defaultState: State = {
  auth,
  groupState,
  userState,
}

export default defaultState
