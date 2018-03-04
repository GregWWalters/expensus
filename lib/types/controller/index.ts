import Koa, { Middleware } from 'Koa'
import { User } from '../../server/db/entities/User'

export interface Controller {
  [name: string]: Middleware
}

export interface AuthedContext extends Koa.Context {
  user: User
}
