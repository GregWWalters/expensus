import { createSelector } from 'reselect'
import State from '../../../types/state'

export function selectCategoryState(state: State) {
  return state.categoryState
}

export const selectCategories = createSelector(
  selectCategoryState,
  categoryState => categoryState.categories
)

export const selectCategoryById = createSelector(
  selectCategories,
  (_, id: number) => id,
  (categories, id) => categories.byId[id]
)

export const selectCategoryIds = createSelector(
  selectCategories,
  categories => categories.allIds
)

export const selectCategoryByIds = createSelector(
  selectCategories,
  categories => categories.byId
)

export const selectRootCategoryIds = createSelector(
  selectCategoryIds,
  selectCategoryByIds,
  (allIds, byId) => allIds.filter(id => byId[id] && byId[id].childrenIds.length)
)
