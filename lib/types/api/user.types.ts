import { UserForClient } from '../state/user'

export interface FetchUserResponseBody {
  user: UserForClient
  apiToken: string
}
