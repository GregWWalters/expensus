import { ApiState, ApiUpdateState } from '..'
import { Category } from '../../server/db/entities/Category'
import { NormalizedCollection } from '../../server/utils/normalizer'

export interface CategoryForClient {
  id: Category['id']
  name: Category['name']
  parentId: Category['parentId']
  childrenIds: ReadonlyArray<Category['id']>
}

export interface CategoryState {
  getCategories: ApiState
  addCategory: ApiState
  updateCategory: ApiUpdateState
  categories: NormalizedCollection<CategoryForClient>
}
