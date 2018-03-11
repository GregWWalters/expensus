import { Moment } from 'moment'
import { TransactionsResponse } from 'plaid'
import { Account } from '../db/entities/Account'
import { Item } from '../db/entities/Item'
import { Transaction } from '../db/entities/Transaction'
import TokenRequiredError from '../errors/TokenRequiredError'
import {
  createDateBlocksFromRange,
  PLAID_DATE_FORMAT,
  TEN_DAYS,
} from '../utils/date'
import PlaidService from './plaid.service'

export default class ItemService extends PlaidService {
  async getAccessToken(publicToken: string) {
    const resp = await this.plaidClient.exchangePublicToken(publicToken)
    this.token = resp.access_token
    return resp.access_token
  }

  async fetchItem(accessToken: string) {
    const itemResponse = await this.plaidClient.getItem(accessToken)
    return itemResponse.item
  }

  async createNewItem(publicToken: string) {
    const token = await this.getAccessToken(publicToken)
    const item = await this.fetchItem(token)
    const institution = (await this.plaidClient.getInstitutionById(
      item.institution_id
    )).institution

    const newItem = new Item()
    newItem.accessToken = token
    newItem.itemId = item.item_id
    newItem.groupId = this.groupId
    newItem.name = institution.name
    newItem.institutionName = institution.name
    newItem.institutionId = item.institution_id
    newItem.webhook = item.webhook
    await newItem.save()
    const accounts = await this.createAccountsForItem(newItem)
    newItem.accounts = accounts
    return newItem
  }

  async createAccountsForItem(item: Item) {
    if (!this.token) throw new TokenRequiredError()
    // casting because my typings are stricter than plaidClient's
    const accountResponse = (await this.plaidClient.getAccounts(
      this.token
    )) as Plaid.GetAccountResponseBody

    return Promise.all(
      accountResponse.accounts.map(async account => {
        const newAccount = new Account()
        newAccount.accountId = account.account_id
        newAccount.balances = account.balances
        newAccount.mask = account.mask
        newAccount.name = account.name
        newAccount.officialName = account.official_name
        newAccount.itemId = item.id
        newAccount.type = account.type
        newAccount.subtype = account.subtype
        return newAccount.save()
      })
    )
  }

  /** Fetches and saves transactions to database for the given date range
   * @param startDate moment date
   * @param endDate moment date
   * @returns array of fetched transactions
   *
   * Notes:
   *  - transactions are returned in descending time-order (recent first)
   *  - Plaid recommends restricting time band to no more than 10 days
   *  - With time-blocks of 10-days, pagination at count=500 should practically
   *    never happen, so not doing a whole lot of fancy error handling
   */
  async fetchAndSaveTransactionsForItem(startDate: Moment, endDate: Moment) {
    const token = this.token
    if (!token) throw new TokenRequiredError()

    const transactions: TransactionsResponse['transactions'] = []
    const timeBlocks = createDateBlocksFromRange(startDate, endDate, TEN_DAYS)

    for (const [start, end] of timeBlocks) {
      let currentBlockCount = 0
      let page = 0
      while (true) {
        const resp = await this.plaidClient.getTransactions(
          token,
          start.format(PLAID_DATE_FORMAT),
          end.format(PLAID_DATE_FORMAT),
          {
            count: 500,
            offset: page * 500,
          }
        )
        currentBlockCount += resp.transactions.length
        transactions.push(...resp.transactions)
        if (currentBlockCount >= resp.total_transactions) break
        page++
      }
    }

    const newTxns = await Transaction.createTransactionsFromPlaidApi(
      transactions
    )

    return newTxns
  }
}
