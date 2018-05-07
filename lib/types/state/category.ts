import { ApiState, ApiUpdateState } from '..'
import { Category } from '../../server/db/entities/Category'

export interface CategoryForClient {
  id: Category['id']
  name: Category['name']
  parentId: Category['parentId']
  childrenIds: ReadonlyArray<Category['id']>
}

export interface CategoryState {
  loadCategories: ApiState
  submitCategories: ApiState
  updateCategory: ApiUpdateState
  byId: { [id: number]: CategoryForClient }
  allIds: ReadonlyArray<number>
}
