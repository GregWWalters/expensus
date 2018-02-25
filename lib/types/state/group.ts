import { Group } from '../../server/db/entities/Group'
import { User } from '../../server/db/entities/User'

export default interface GroupState {
  id: Group['id']
  name: Group['name']
  owner: Pick<User, 'firstName' | 'lastName' | 'email'>
  users: ReadonlyArray<Pick<User, 'firstName' | 'lastName' | 'email'>>
}
