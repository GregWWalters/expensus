import { GroupForClient } from '../state/group'

export interface CreateGroupParams {
  name: string
}

export interface CreateGroupResponseBody {
  group: GroupForClient
}

export interface FetchGroupResponseBody {
  group: GroupForClient | null
}
