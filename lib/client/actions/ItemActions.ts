import { createAction } from 'redux-act'
import { ClientApiError } from '../../types/api'
import { ItemForClient } from '../../types/state/item'

// === Basic Actions
export const setItems = createAction<ReadonlyArray<ItemForClient>>('SET_ITEMS')
export const loadItems = createAction('LOAD_ITEMS')
export const loadItemsError = createAction<ClientApiError>('LOAD_ITEMS_ERROR')
