import Router from 'koa-router'
import { handlePlaidWebhook } from '../controllers/webhooks/plaid'

const webhook = new Router()
webhook.post('/plaid', handlePlaidWebhook)

export default webhook
