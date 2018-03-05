import { Item } from '../../server/db/entities/Item'
import { ApiState } from '../index'

export interface ItemForClient {
  id: Item['id']
  itemId: Item['itemId']
  groupId: Item['groupId']
  institutionId: Item['institutionId']
  accounts: Item['accounts']
}

export default interface ItemState {
  loadItems: ApiState
  submitItem: ApiState
  items: ReadonlyArray<ItemForClient>
}
