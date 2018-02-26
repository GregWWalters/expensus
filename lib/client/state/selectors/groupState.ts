import { createSelector } from 'reselect'
import State from '../../../types/state'

export const selectGroupState = (state: State) => state.groupState

export const selectGroup = createSelector(
  selectGroupState,
  groupState => groupState.group
)

export const selectLoadGroupState = createSelector(
  selectGroupState,
  groupState => groupState.loadGroup
)

export const selectLoadGroupStatus = createSelector(
  selectLoadGroupState,
  loadGroup => loadGroup.status
)

export const selectLoadGroupError = createSelector(
  selectLoadGroupState,
  loadGroup => loadGroup.error
)

export const selectSubmitGroupState = createSelector(
  selectGroupState,
  groupState => groupState.submitGroup
)

export const selectSubmitGroupStatus = createSelector(
  selectSubmitGroupState,
  submitGroup => submitGroup.status
)

export const selectSubmitGroupError = createSelector(
  selectSubmitGroupState,
  submitGroup => submitGroup.error
)
