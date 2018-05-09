import { FetchUserResponseBody } from '../../types/api/user'
import { AuthedContext, Controller } from '../../types/controller'
import { createToken } from '../middleware/auth'

const UserController: Controller = {}

interface FetchUserContext extends AuthedContext {
  body: FetchUserResponseBody
}

UserController.fetchUser = async (ctx: FetchUserContext, next) => {
  const { user } = ctx
  if (!user) return ctx.throw(401)
  ctx.status = 200
  ctx.body = {
    apiToken: createToken(user.email),
    user: user.toObjectForClient(),
  }
}

export default UserController
