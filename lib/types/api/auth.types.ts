import UserState from '../state/user'

export interface LoginParams {
  email: string
  password: string
}

export interface LoginResponseBody {
  user: UserState
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
  apiToken: string
}

export interface ApiTokenPayload {
  email: string
}
