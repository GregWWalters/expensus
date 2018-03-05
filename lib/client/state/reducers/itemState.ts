import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { RequestState } from '../../../types'
import ItemState from '../../../types/state/item'
import {
  addItem,
  loadItems,
  loadItemsError,
  setItems,
  submitItem,
  submitItemError,
} from '../../actions/ItemActions'
import { itemState } from '../defaultState'

// === Combined ItemState reducer
const itemsReducer = createReducer<ItemState['items']>({}, [])
const loadItemsReducer = createReducer<ItemState['loadItems']>(
  {},
  itemState.loadItems
)
const submitItemReducer = createReducer<ItemState['submitItem']>(
  {},
  itemState.submitItem
)
const itemStateReducer = combineReducers({
  items: itemsReducer,
  loadItems: loadItemsReducer,
  submitItem: submitItemReducer,
})
export default itemStateReducer

// === Item Reducer Handlers
itemsReducer.on(setItems, (state, items) => items)

itemsReducer.on(addItem, (state, item) => [...state, item])

// === LoadItem Status Reducer Handlers
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

// === SubmitItem Status Reducer Handlers
submitItemReducer.on(submitItem, state => ({
  error: null,
  status: RequestState.REQUESTING,
}))

submitItemReducer.on(addItem, (state, item) => ({
  error: null,
  status: RequestState.COMPLETED,
}))

submitItemReducer.on(submitItemError, (state, error) => ({
  error,
  status: RequestState.ERROR,
}))
