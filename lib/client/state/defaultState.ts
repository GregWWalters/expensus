import { ApiState, RequestState } from '../../types'
import AuthState from '../../types/state/auth'
import GroupState from '../../types/state/group'
import State from '../../types/state/index'
import UserState from '../../types/state/user'

export const defaultApiState: ApiState = {
  error: null,
  status: RequestState.NOT_REQUESTED,
}

export const auth: AuthState = {
  apiToken: '',
  login: defaultApiState,
  signup: defaultApiState,
}

export const userState: UserState = {
  loadUser: defaultApiState,
  user: null,
}

export const groupState: GroupState = {
  group: null,
  loadGroup: defaultApiState,
  submitGroup: defaultApiState,
}

const defaultState: State = {
  auth,
  groupState,
  userState,
}

export default defaultState
