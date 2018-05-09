import { createAction } from 'redux-act'
import { ThunkAction } from 'redux-thunk'
import { NormalizedCollection } from '../../server/utils/normalizer'
import { ClientApiError } from '../../types/api'
import State from '../../types/state'
import { CategoryForClient } from '../../types/state/category'
import CategoryResource from '../api/resources/category.resource'
import GroupRequiredError from '../errors/GroupRequiredError'
import UserRequiredError from '../errors/UserRequiredError'
import { selectGroup } from '../state/selectors/groupState'
import { selectUser } from '../state/selectors/userState'

export const setCategories = createAction<
  NormalizedCollection<CategoryForClient>
>('SET_CATEGORIES')
export const getCategoriesRequest = createAction('GET_CATEGORIES_REQUEST')
export const getCategoriesError = createAction<ClientApiError>(
  'GET_CATEGORIES_ERROR'
)
export const addCategory = createAction<CategoryForClient>('ADD_CATEGORY')
export const addCategoryRequest = createAction('ADD_CATEGORY_REQUEST')
export const addCategoryError = createAction<ClientApiError>(
  'ADD_CATEGORY_ERROR'
)
export const updateCategory = createAction<CategoryForClient>(
  'UPDATED_CATEGORY'
)
export const updateCategoryRequest = createAction<number>(
  'UPDATE_CATEGORY_REQUEST'
)
export const updateCategoryError = createAction<ClientApiError>(
  'UPDATE_CATEGORY_ERROR'
)

export const getCategories = (): ThunkAction<
  Promise<void | ClientApiError>,
  State,
  null
> => async (dispatch, getState) => {
  const user = selectUser(getState())
  const group = selectGroup(getState())
  if (!user) throw new UserRequiredError('User required to get categories')
  if (!group) throw new GroupRequiredError('Group required to get categories')

  dispatch(getCategoriesRequest())
  const categoryApi = new CategoryResource(getState(), dispatch)
  const resp = await categoryApi.getCategories()

  if ('err' in resp) {
    dispatch(getCategoriesError(resp.err))
    return Promise.reject(resp.err)
  }

  dispatch(setCategories(resp.categories))
  return Promise.resolve()
}
