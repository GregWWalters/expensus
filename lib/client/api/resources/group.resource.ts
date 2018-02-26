import {
  CreateGroupResponseBody,
  FetchGroupResponseBody,
} from '../../../types/api/group.types'
import { ApiResource } from '../ApiResource'

export default class GroupResource extends ApiResource {
  async fetchGroup() {
    try {
      const resp = await this.req.get<FetchGroupResponseBody>('/group', {
        headers: this.defaultHeaders,
      })
      return resp.data
    } catch (err) {
      return this.handleError(err)
    }
  }

  async createGroup(groupName: string) {
    try {
      const resp = await this.req.post<CreateGroupResponseBody>(
        '/group/create',
        { name: groupName },
        { headers: this.defaultHeaders }
      )
      return resp.data
    } catch (err) {
      return this.handleError(err)
    }
  }
}
