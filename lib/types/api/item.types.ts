export interface CreateItemParams {
  publicToken: string
  groupId: number
}

export interface CreateItemResponseBody {
  access_token: string
  item_id: string
  request_id: string
}
