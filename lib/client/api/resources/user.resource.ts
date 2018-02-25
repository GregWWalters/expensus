import { FetchUserResponseBody } from '../../../types/api/user.types'
import { ApiResource } from '../ApiResource'

export default class UserResource extends ApiResource {
  async fetchUser() {
    try {
      const resp = await this.req.get<FetchUserResponseBody>('/user/me', {
        headers: this.defaultHeaders,
      })
      return resp.data
    } catch (err) {
      return this.handleError(err)
    }
  }
}
