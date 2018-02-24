import Koa from 'koa'
// import { pick } from 'lodash'
import { Controller } from '../../types/controller'
import { Group } from '../db/entities/Group'
import { User } from '../db/entities/User'

const GroupController: Controller = {}

interface GroupContext extends Koa.Context {
  user: User
}

GroupController.getGroup = async (ctx: GroupContext, next) => {
  const { user } = ctx
  const group = await Group.find(user.group)
  ctx.body = group
}

export default GroupController
