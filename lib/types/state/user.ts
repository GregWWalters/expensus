import { User } from '../../server/db/entities/User'
import { ApiState } from '../index'

export interface UserForClient {
  email: User['email']
  firstName: User['firstName']
  lastName: User['lastName']
  groupId: User['groupId']
}

export default interface UserState {
  loadUser: ApiState
  user: UserForClient | null
}
