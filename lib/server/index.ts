import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import favicon from 'koa-favicon'
import logger from 'koa-logger'
import path from 'path'
import router from './routes'

import 'dotenv/config'

const app = new Koa()
const port = process.env.SERVER_PORT || 3000

app.use(logger())
app.use(favicon(path.join(process.cwd(), 'public', 'favicon.ico')))
app.use(bodyparser())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port)

console.log('Server running on port: ', port)
