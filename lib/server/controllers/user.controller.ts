import Koa from 'koa'
import { FetchUserResponseBody } from '../../types/api/user.types'
import { Controller } from '../../types/controller'
import { User } from '../db/entities/User'
import { createToken } from '../middleware/auth.middleware'

const UserController: Controller = {}

interface FetchUserContext extends Koa.Context {
  user: User
  body: FetchUserResponseBody
}

UserController.fetchUser = async (ctx: FetchUserContext, next) => {
  const { user } = ctx
  if (!user) {
    return ctx.throw(401)
  } else {
    ctx.status = 200
    ctx.body = {
      apiToken: createToken(user.email),
      user: user.toObjectForClient(),
    }
  }
}

export default UserController
