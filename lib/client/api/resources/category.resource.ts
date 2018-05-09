import { GetCategoriesResponseBody } from '../../../types/api/category'
import { ApiResource } from '../ApiResource'

export default class CategoryResource extends ApiResource {
  async getCategories() {
    try {
      const resp = await this.req.get<GetCategoriesResponseBody>('/category', {
        headers: this.defaultHeaders,
      })
      return resp.data
    } catch (err) {
      return this.handleError(err)
    }
  }
}
