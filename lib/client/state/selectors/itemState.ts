import { createSelector } from 'reselect'
import State from '../../../types/state'

export const selectItemState = (state: State) => state.itemState

export const selectItems = createSelector(
  selectItemState,
  itemState => itemState.items
)

export const selectLoadItemsState = createSelector(
  selectItemState,
  itemState => itemState.loadItems
)

export const selectSubmitItemState = createSelector(
  selectItemState,
  itemState => itemState.submitItem
)
