import {
  CreateItemParams,
  CreateItemResponseBody,
  GetItemsResponseBody,
} from '../../../types/api/item'
import { ApiResource } from '../ApiResource'

export default class ItemResource extends ApiResource {
  async createItem(params: CreateItemParams) {
    try {
      const resp = await this.req.post<CreateItemResponseBody>(
        '/item/create',
        params,
        { headers: this.defaultHeaders }
      )
      return resp.data
    } catch (err) {
      return this.handleError(err)
    }
  }

  async getItems() {
    try {
      const resp = await this.req.get<GetItemsResponseBody>('/item', {
        headers: this.defaultHeaders,
      })
      return resp.data
    } catch (err) {
      return this.handleError(err)
    }
  }
}
