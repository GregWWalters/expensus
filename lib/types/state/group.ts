import { Group } from '../../server/db/entities/Group'
import { FetchStatus } from '../index'
import { UserForClient } from './user'

export interface GroupForClient {
  id: Group['id']
  name: Group['name']
  owner: UserForClient
  users: ReadonlyArray<UserForClient>
}

export default interface GroupState {
  status: FetchStatus
  group: GroupForClient | null
}
