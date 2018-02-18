import 'dotenv/config'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import createConnectionOptions from './db/createConnectionOptions'

import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import favicon from 'koa-favicon'
import logger from 'koa-logger'
import path from 'path'
import router from './routes'

const app = new Koa()
const port = process.env.SERVER_PORT || 3000

createConnection(createConnectionOptions())
  .then(async connection => {
    app
      .use(logger())
      .use(bodyparser())
      .use(router.routes())
      .use(router.allowedMethods())

    app.listen(port, () => {
      console.log('Server running on port: ', port)
    })
  })
  .catch(err => console.log('Startup error: ', err))
