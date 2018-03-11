import Koa from 'koa'
import moment from 'moment'
import { Item } from '../../db/entities/Item'
import ItemService from '../../services/item.service'

interface PlaidWebhookRequest extends Koa.Request {
  body: Plaid.Webhook
}

interface PlaidWebhookContext extends Koa.Context {
  request: PlaidWebhookRequest
}

const handlePlaidWebhook = async (ctx: PlaidWebhookContext, next) => {
  const webhookData = ctx.request.body
  const item = await Item.findOne({ where: { itemId: webhookData.item_id } })
  if (!item) {
    console.log(
      `No item found matching webhook item id: ${webhookData.item_id}`
    )
    return
  }

  const itemService = new ItemService(item.groupId, item.accessToken)

  // todo: refactor these into individual webhook handlers
  if (webhookData.webhook_type === 'TRANSACTIONS') {
    switch (webhookData.webhook_code) {
      case 'DEFAULT_UPDATE':
        await itemService.fetchAndSaveTransactionsForItem(
          moment().subtract(10, 'days'),
          moment()
        )
        break
      case 'INITIAL_UPDATE':
        await itemService.fetchAndSaveTransactionsForItem(
          moment().subtract(30, 'days'),
          moment()
        )
        break
      case 'HISTORICAL_UPDATE':
        await itemService.fetchAndSaveTransactionsForItem(
          moment().subtract(1, 'year'),
          moment()
        )
    }
  }

  // TODO: handle item webhooks
  ctx.status = 200
}

export { handlePlaidWebhook }
