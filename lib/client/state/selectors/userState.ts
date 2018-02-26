import { createSelector } from 'reselect'
import State from '../../../types/state'

export const selectUserState = (state: State) => state.userState

export const selectUser = createSelector(
  selectUserState,
  userState => userState.user
)

export const selectLoadUserState = createSelector(
  selectUserState,
  userState => userState.loadUser
)

export const selectLoadUserStatus = createSelector(
  selectLoadUserState,
  loadUser => loadUser.status
)

export const selectLoadUserError = createSelector(
  selectLoadUserState,
  loadUser => loadUser.error
)
