import GroupState from '../state/group'
import UserState from '../state/user'

export interface LoginParams {
  email: string
  password: string
}

export interface LoginResponseBody {
  user: UserState
  group: GroupState | null
  apiToken: string
}

export interface SignupParams {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface SignupResponseBody {
  user: UserState
  group: GroupState | null
  apiToken: string
}

export interface ApiTokenPayload {
  email: string
}
