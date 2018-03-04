import Koa from 'koa'
import plaid from 'plaid'
import { CreateItemParams } from '../../types/api/item.types'
import { Controller } from '../../types/controller'
import config from '../config'
import { Account } from '../db/entities/Account'
import { Item } from '../db/entities/Item'

const ItemController: Controller = {}

interface CreateItemRequest extends Koa.Request {
  body: CreateItemParams
}
interface CreateItemContext extends Koa.Context {
  request: CreateItemRequest
}

ItemController.createItem = async (ctx: CreateItemContext, next) => {
  console.log('plaid config: ', config.plaid)
  const plaidClient = new plaid.Client(
    config.plaid.id,
    config.plaid.secret,
    config.plaid.public,
    config.plaid.env
  )
  const { publicToken, groupId } = ctx.request.body

  const itemResponse = await plaidClient.exchangePublicToken(publicToken)
  const accessToken = itemResponse.access_token
  console.log('itemResponse: ', itemResponse)

  // TODO: look up based on item_id here, maybe we already have it?

  const newItem = new Item()
  newItem.accessToken = accessToken
  newItem.itemId = itemResponse.item_id
  newItem.groupId = groupId

  const { item } = await plaidClient.getItem(accessToken)
  newItem.institutionId = item.institution_id
  newItem.webhook = item.webhook
  await newItem.save()
  console.log('newItem: ', newItem)

  // casting because my typings are stricter than plaidClients
  const accountResponse = (await plaidClient.getAccounts(
    accessToken
  )) as Plaid.GetAccountResponseBody
  for (const account of accountResponse.accounts) {
    const newAccount = new Account()
    newAccount.accountId = account.account_id
    newAccount.balances = account.balances
    newAccount.mask = account.mask
    newAccount.name = account.name
    newAccount.officialName = account.official_name
    newAccount.itemId = newItem.id
    newAccount.type = account.type
    newAccount.subtype = account.subtype
    await newAccount.save()
  }

  console.log(
    'Saved accounts: ',
    accountResponse.accounts.map(a => a.account_id)
  )

  ctx.status = 201
}

export default ItemController
