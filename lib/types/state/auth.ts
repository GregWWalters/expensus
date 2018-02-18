export default interface AuthState {
  apiToken: string
  loginError: string | null
  loginSubmitting: boolean
  loginSuccess: boolean
  signupError: string | null
  signupSubmitting: boolean
  signupSuccess: boolean
}
