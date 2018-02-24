import { Group } from '../../server/db/entities/Group'

interface GroupState {
  id: Group['id']
  name: Group['name']
  founder: Pick<Group['founder'], 'firstName' | 'lastName' | 'email'>
  users: ReadonlyArray<
    Pick<Group['founder'], 'firstName' | 'lastName' | 'email'>
  >
}

export default GroupState
