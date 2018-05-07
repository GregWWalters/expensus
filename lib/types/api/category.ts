import { CategoryForClient } from '../state/category'

export interface GetCategoriesResponseBody {
  categories: ReadonlyArray<CategoryForClient>
}
