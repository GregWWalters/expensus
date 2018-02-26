import { createSelector } from 'reselect'
import State from '../../../types/state'

export const selectAuth = (state: State) => state.auth

export const selectApiToken = createSelector(selectAuth, auth => auth.apiToken)

export const selectLoginState = createSelector(selectAuth, auth => auth.login)

export const selectLoginStatus = createSelector(
  selectLoginState,
  loginState => loginState.status
)

export const selectLoginError = createSelector(
  selectLoginState,
  loginState => loginState.error
)

export const selectSignupState = createSelector(selectAuth, auth => auth.signup)

export const selectSignupStatus = createSelector(
  selectSignupState,
  signupState => signupState.status
)

export const selectSignupError = createSelector(
  selectSignupState,
  signupState => signupState.error
)
