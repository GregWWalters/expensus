import { User } from '../../server/db/entities/User'

export default interface UserState {
  email: User['email']
  firstName: User['firstName']
  lastName: User['lastName']
}
