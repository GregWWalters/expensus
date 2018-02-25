import GroupState from '../state/group'

export interface CreateGroupParams {
  name: string
}

export interface CreateGroupResponseBody {
  group: GroupState
}
