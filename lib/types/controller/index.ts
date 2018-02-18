import { Middleware } from 'Koa'

export interface Controller {
  [name: string]: Middleware
}
