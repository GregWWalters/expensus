import { ItemForClient } from '../state/item'

export interface CreateItemParams {
  publicToken: string
  groupId: number
}

export interface CreateItemResponseBody {
  item: ItemForClient
}

export interface GetItemsResponseBody {
  items: ReadonlyArray<ItemForClient>
}
