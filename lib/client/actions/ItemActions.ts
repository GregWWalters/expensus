import { createAction } from 'redux-act'
import { ThunkAction } from 'redux-thunk'
import { ClientApiError } from '../../types/api'
import State from '../../types/state'
import { ItemForClient } from '../../types/state/item'
import ItemResource from '../api/resources/item'
import GroupRequiredError from '../errors/GroupRequiredError'
import UserRequiredError from '../errors/UserRequiredError'
import { selectUser } from '../state/selectors/userState'

// === Basic Actions
export const setItems = createAction<ReadonlyArray<ItemForClient>>('SET_ITEMS')
export const loadItems = createAction('LOAD_ITEMS')
export const loadItemsError = createAction<ClientApiError>('LOAD_ITEMS_ERROR')
export const submitItem = createAction('SUBMIT_ITEM')
export const submitItemError = createAction<ClientApiError>('SUBMIT_ITEM_ERROR')
export const addItem = createAction<ItemForClient>('ADD_ITEM')

// === Async Actions
export const fetchItems = (): ThunkAction<Promise<void>, State, null> => async (
  dispatch,
  getState
) => {
  const user = selectUser(getState())
  if (!user) throw new UserRequiredError('User required to get items')
  if (!user.groupId) {
    throw new GroupRequiredError('Group required to get items')
  }

  dispatch(loadItems())
  const itemsApi = new ItemResource(getState(), dispatch)
  const resp = await itemsApi.getItems()

  if ('err' in resp) {
    dispatch(loadItemsError(resp.err))
    return
  }

  dispatch(setItems(resp.items))
}

export const submitItemRequest = (
  token: string
): ThunkAction<Promise<void>, State, null> => async (dispatch, getState) => {
  const user = selectUser(getState())
  if (!user) throw new UserRequiredError('User required to create item')
  if (!user.groupId) {
    throw new GroupRequiredError('Group required to create item')
  }

  dispatch(submitItem())
  const itemsApi = new ItemResource(getState(), dispatch)
  const resp = await itemsApi.createItem({
    groupId: user.groupId,
    publicToken: token,
  })

  if ('err' in resp) {
    dispatch(submitItemError(resp.err))
    return
  }

  dispatch(addItem(resp.item))
}
