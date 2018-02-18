import Koa from 'koa'

export const Login: Koa.Middleware = async (ctx, next) => {
  ctx.body = "You've reached the login handler"
}

export const Signup: Koa.Middleware = async (ctx, next) => {
  ctx.body = "You've reached the signup handler"
}
