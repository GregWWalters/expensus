import { ApiState } from '../index'

export default interface AuthState {
  apiToken: string
  login: ApiState
  signup: ApiState
}
