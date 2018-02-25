import { createSelector } from 'reselect'
import State from '../../../types/state'

export const selectGroupState = (state: State) => state.groupState

export const selectGroup = createSelector(
  selectGroupState,
  groupState => groupState.group
)

export const selectGroupStatus = createSelector(
  selectGroupState,
  groupState => groupState.status
)
