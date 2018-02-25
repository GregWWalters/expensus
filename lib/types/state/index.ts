import AuthState from './auth'
import GroupState from './group'
import UserState from './user'

export default interface State {
  readonly auth: AuthState
  readonly userState: UserState
  readonly groupState: GroupState
}
