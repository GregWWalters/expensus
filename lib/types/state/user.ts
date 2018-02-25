import { FetchStatus } from '..'
import { User } from '../../server/db/entities/User'

export interface UserForClient {
  email: User['email']
  firstName: User['firstName']
  lastName: User['lastName']
  groupId: User['groupId']
}

export default interface UserState {
  status: FetchStatus
  user: UserForClient | null
}
