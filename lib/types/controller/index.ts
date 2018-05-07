import Koa, { Middleware } from 'Koa'
import { Group } from '../../server/db/entities/Group'
import { User } from '../../server/db/entities/User'

export interface Controller {
  [name: string]: Middleware
}

export interface AuthedContext extends Koa.Context {
  readonly user: User
}

export interface GroupAuthedContext extends AuthedContext {
  readonly group: Group
}
