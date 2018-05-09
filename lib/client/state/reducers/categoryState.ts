import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { RequestState } from '../../../types'
import { CategoryState } from '../../../types/state/category'
import {
  addCategory,
  addCategoryError,
  addCategoryRequest,
  getCategoriesError,
  getCategoriesRequest,
  setCategories,
  updateCategory,
  updateCategoryError,
  updateCategoryRequest,
} from '../../actions/CategoryActions'
import { categoryState } from '../defaultState'

// === Combined CategoryState reducer
const categoriesReducer = createReducer<CategoryState['categories']>(
  {},
  categoryState.categories
)
const getCategoriesReducer = createReducer<CategoryState['getCategories']>(
  {},
  categoryState.getCategories
)
const addCategoryReducer = createReducer<CategoryState['addCategory']>(
  {},
  categoryState.addCategory
)
const updateCategoryReducer = createReducer<CategoryState['updateCategory']>(
  {},
  categoryState.updateCategory
)

const categoryStateReducer = combineReducers<CategoryState>({
  categories: categoriesReducer,
  getCategories: getCategoriesReducer,
  addCategory: addCategoryReducer,
  updateCategory: updateCategoryReducer,
})
export default categoryStateReducer

// === Categories Reducer Handlers
categoriesReducer.on(setCategories, (state, categories) => categories)
categoriesReducer.on(addCategory, (state, category) => ({
  byId: { ...state.byId, [category.id]: category },
  allIds: [...state.allIds, category.id].sort(),
}))
categoriesReducer.on(updateCategory, (state, category) => ({
  byId: { ...state.byId, [category.id]: category },
  allIds: state.allIds,
}))

// === Get Categories Reducer Handlers
getCategoriesReducer.on(setCategories, (state, _) => ({
  status: RequestState.COMPLETED,
  error: null,
}))
getCategoriesReducer.on(getCategoriesRequest, state => ({
  status: RequestState.REQUESTING,
  error: null,
}))
getCategoriesReducer.on(getCategoriesError, (state, error) => ({
  status: RequestState.ERROR,
  error,
}))

// Add Category Reducer Handlers
addCategoryReducer.on(addCategory, (state, _) => ({
  status: RequestState.COMPLETED,
  error: null,
}))
addCategoryReducer.on(addCategoryRequest, state => ({
  status: RequestState.REQUESTING,
  error: null,
}))
addCategoryReducer.on(addCategoryError, (state, error) => ({
  status: RequestState.ERROR,
  error,
}))

// Update Category Reducer Handlers
updateCategoryReducer.on(updateCategory, (state, _) => ({
  ...state,
  status: RequestState.COMPLETED,
  error: null,
}))
updateCategoryReducer.on(updateCategoryRequest, (state, id) => ({
  id,
  status: RequestState.REQUESTING,
  error: null,
}))
updateCategoryReducer.on(updateCategoryError, (state, error) => ({
  ...state,
  status: RequestState.ERROR,
  error,
}))
