import { Nullable } from '..'
import { CategoryForClient } from '../state/category'

export interface GetCategoriesResponseBody {
  categories: ReadonlyArray<CategoryForClient>
}

export interface CreateCategoryParams {
  name: string
  parentId: Nullable<number>
}

export interface CreateCategoryResponseBody {
  category: CategoryForClient
}

export interface UpdateCategoryParams {
  category: CategoryForClient
}

export interface UpdateCategoryResponseBody {
  category: CategoryForClient
}

export interface DeleteCategoryParams {
  id: CategoryForClient['id']
}
