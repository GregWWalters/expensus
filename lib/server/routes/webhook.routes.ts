import Router from 'koa-router'
import { handlePlaidWebhook } from '../controllers/plaidWebhook.controller'

const webhook = new Router()
webhook.post('/plaid', handlePlaidWebhook)

export default webhook
