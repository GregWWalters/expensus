import { ClientApiError } from '../api'

export default interface AuthState {
  apiToken: string
  loginError: ClientApiError | null
  loginSubmitting: boolean
  loginSuccess: boolean
  signupError: ClientApiError | null
  signupSubmitting: boolean
  signupSuccess: boolean
}
