import { createSelector } from 'reselect'
import State from '../../../types/state'

export const selectAuth = (state: State) => state.auth

export const selectApiToken = createSelector(selectAuth, auth => auth.apiToken)

export const selectLoginError = createSelector(
  selectAuth,
  auth => auth.loginError
)

export const selectLoginSubmitting = createSelector(
  selectAuth,
  auth => auth.loginSubmitting
)

export const selectLoginSuccess = createSelector(
  selectAuth,
  auth => auth.loginSuccess
)

export const selectSignupError = createSelector(
  selectAuth,
  auth => auth.signupError
)

export const selectSignupSubmitting = createSelector(
  selectAuth,
  auth => auth.signupSubmitting
)

export const selectSignupSuccess = createSelector(
  selectAuth,
  auth => auth.signupSuccess
)
