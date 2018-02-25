import jwt from 'jsonwebtoken'
import Koa from 'koa'
import { ApiTokenPayload } from '../../types/api/auth.types'
import config from '../config'
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

export const jwtAuth: Koa.Middleware = async (ctx, next) => {
  const token = extractJwt(ctx.headers.authorization)
  if (!token) {
    return ctx.throw(400)
  } else {
    try {
      const decoded = verifyToken(token) as ApiTokenPayload
      if (!decoded.email) return ctx.throw(401)
      const user = await User.findOne({
        relations: ['group'],
        where: { email: decoded.email },
      })
      ctx.user = user
    } catch (e) {
      return ctx.throw(401)
    }
    return next()
  }
}
