import { createSelector } from 'reselect'
import State from '../../../types/state'

export const selectUserState = (state: State) => state.userState

export const selectUser = createSelector(
  selectUserState,
  userState => userState.user
)

export const selectUserStatus = createSelector(
  selectUserState,
  userState => userState.status
)
