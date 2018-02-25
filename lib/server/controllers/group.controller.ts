import Koa from 'koa'
import {
  CreateGroupParams,
  CreateGroupResponseBody,
} from '../../types/api/group.types'
import { Controller } from '../../types/controller'
import { Group } from '../db/entities/Group'
import { User } from '../db/entities/User'

const GroupController: Controller = {}

interface CreateGroupRequest extends Koa.Request {
  body: CreateGroupParams
}
interface CreateGroupContext extends Koa.Context {
  user: User
  request: CreateGroupRequest
  body: CreateGroupResponseBody
}

GroupController.createGroup = async (ctx: CreateGroupContext, next) => {
  const { name } = ctx.request.body
  const user = ctx.user
  if (user.group) {
    ctx.throw(422, 'User already member of group')
  } else {
    const newGroup = new Group()
    newGroup.name = name
    newGroup.owner = user
    newGroup.users = [user]
    ctx.status = 201
    ctx.body = { group: newGroup }
  }
}

export default GroupController
