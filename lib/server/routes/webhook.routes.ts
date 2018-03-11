import Router from 'koa-router'
import { handlePlaidWebhook } from '../controllers/webhooks/plaid.webhookController'

const webhook = new Router()
webhook.post('/plaid', handlePlaidWebhook)

export default webhook
