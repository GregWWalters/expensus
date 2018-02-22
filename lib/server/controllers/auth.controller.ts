import Koa from 'koa'
import { pick } from 'lodash'
import {
  LoginParams,
  LoginResponseBody,
  SignupParams,
  SignupResponseBody,
} from '../../types/api/auth.types'
import { Controller } from '../../types/controller'
import { User } from '../db/entities/User'
import { hashPassword, verifyPassword } from '../services/auth.service'

const AuthController: Controller = {}

interface LoginRequest extends Koa.Request {
  body: LoginParams
}
interface LoginContext extends Koa.Context {
  request: LoginRequest
  body: LoginResponseBody
}

AuthController.login = async (ctx: LoginContext, next) => {
  const { email, password } = ctx.request.body
  const user = await User.findOne({ email })
  if (!user) {
    ctx.throw(401)
  } else {
    const valid = await verifyPassword(JSON.parse(user.passwordHash), password)
    if (!valid) {
      ctx.throw(401)
    } else {
      ctx.status = 200
      ctx.body = {
        user: pick(user, 'email', 'firstName', 'lastName'),
        apiToken: 'abc123',
      }
    }
  }
}

interface SignupRequest extends Koa.Request {
  body: SignupParams
}
interface SignupContext extends Koa.Context {
  request: SignupRequest
  body: SignupResponseBody
}

AuthController.signup = async (ctx: SignupContext, next) => {
  const { email, password, firstName, lastName } = ctx.request.body
  const user = await User.findOne({ email })
  if (user) {
    ctx.throw(422, 'Email address taken')
  } else {
    const passwordHash = await hashPassword(password)
    const newUser = new User()
    newUser.email = email
    newUser.firstName = firstName
    newUser.lastName = lastName
    newUser.passwordHash = JSON.stringify(passwordHash)
    await newUser.save()
    ctx.status = 201
    ctx.body = {
      user: pick(newUser, 'email', 'firstName', 'lastName'),
      apiToken: 'abc123',
    }
  }
}

export default AuthController
