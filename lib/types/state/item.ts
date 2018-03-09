import { Account } from '../../server/db/entities/Account'
import { Item } from '../../server/db/entities/Item'
import { ApiState } from '../index'

export interface ItemForClient {
  accounts: ReadonlyArray<AccountForClient>
  groupId: Item['groupId']
  id: Item['id']
  itemId: Item['itemId']
  institutionId: Item['institutionId']
  institutionName: Item['institutionName']
  name: Item['name']
}

export interface AccountForClient {
  accountId: Account['accountId']
  balances: Account['balances']
  id: Account['id']
  mask: Account['mask']
  name: Account['name']
  officialName: Account['officialName']
  type: Account['type']
  subtype: Account['subtype']
  itemId: Account['itemId']
}

export default interface ItemState {
  loadItems: ApiState
  submitItem: ApiState
  items: ReadonlyArray<ItemForClient>
}
