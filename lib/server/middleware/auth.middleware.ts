import jwt from 'jsonwebtoken'
import Koa from 'koa'
import { ApiTokenPayload } from '../../types/api/auth'
import { AuthedContext } from '../../types/controller'
import config from '../config'
import { Group } from '../db/entities/Group'
import { User } from '../db/entities/User'

// TODO: implement expiration
export const createToken = (email: string) =>
  jwt.sign({ email }, config.server.secret)

export const verifyToken = (token: string) =>
  jwt.verify(token, config.server.secret)

export const extractJwt = (header: string) => {
  const bearerRegEx = /Bearer\s((.*))/
  const results = bearerRegEx.exec(header)
  return results && results[1]
}

interface AuthContext extends Koa.Context {
  headers: { authorization: string }
}

export const jwtAuth: Koa.Middleware = async (ctx: AuthContext, next) => {
  const token = extractJwt(ctx.headers.authorization)
  if (!token) return ctx.throw(400)
  try {
    const decoded = verifyToken(token) as ApiTokenPayload
    if (!decoded.email) return ctx.throw(401)
  } catch (error) {
    return ctx.throw(401)
  }
  return next()
}

interface TokenPayloadContext extends AuthContext {
  tokenPayload: ApiTokenPayload
}

export const loadUser: Koa.Middleware = async (
  ctx: TokenPayloadContext,
  next
) => {
  const user = await User.findOne({ where: { email: ctx.tokenPayload.email } })
  if (!user) return ctx.throw(401)
  ctx.user = user
  return next()
}

export const loadGroup: Koa.Middleware = async (ctx: AuthedContext, next) => {
  const { user } = ctx
  ctx.group = await Group.findOne(user.groupId || undefined)
  if (!ctx.group) return ctx.throw(422, 'Group required for operation')
  return next()
}
