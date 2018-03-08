import { Item } from '../../server/db/entities/Item'
import { ApiState } from '../index'

export interface ItemForClient {
  accounts: Item['accounts']
  groupId: Item['groupId']
  id: Item['id']
  itemId: Item['itemId']
  institutionId: Item['institutionId']
  institutionName: Item['institutionName']
  name: Item['name']
}

export default interface ItemState {
  loadItems: ApiState
  submitItem: ApiState
  items: ReadonlyArray<ItemForClient>
}
