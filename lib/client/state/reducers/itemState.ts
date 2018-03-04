import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { RequestState } from '../../../types'
import ItemState from '../../../types/state/item'
import { loadItems, loadItemsError, setItems } from '../../actions/ItemActions'
import { itemState } from '../defaultState'

// === Combined ItemState reducer
const itemsReducer = createReducer<ItemState['items']>({}, [])
const loadItemsReducer = createReducer<ItemState['loadItems']>(
  {},
  itemState.loadItems
)
const itemStateReducer = combineReducers({
  loadItem: loadItemsReducer,
  items: itemsReducer,
})
export default itemStateReducer

// === Item Reducer Handlers
itemsReducer.on(setItems, (state, item) => item)

// === Item Status Reducer Handlers
loadItemsReducer.on(setItems, (state, item) => ({
  error: null,
  status: RequestState.COMPLETED,
}))

loadItemsReducer.on(loadItems, state => ({
  error: null,
  status: RequestState.REQUESTING,
}))

loadItemsReducer.on(loadItemsError, (state, error) => ({
  error,
  status: RequestState.ERROR,
}))
