import { Client } from 'plaid'
import config from '../config'

function createPlaidClient() {
  return new Client(
    config.plaid.id,
    config.plaid.secret,
    config.plaid.public,
    config.plaid.url
  )
}

export default class PlaidService {
  protected readonly plaidClient: Client

  constructor(protected readonly groupId: number, protected token?: string) {
    this.plaidClient = createPlaidClient()
  }

  async getAccessToken(publicToken: string) {
    const resp = await this.plaidClient.exchangePublicToken(publicToken)
    this.token = resp.access_token
    return resp.access_token
  }
}
