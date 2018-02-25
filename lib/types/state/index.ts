import AuthState from './auth'
import GroupState from './group'
import UserState from './user'

export default interface State {
  readonly auth: AuthState
  readonly user: UserState | null
  readonly group: GroupState | null
}
