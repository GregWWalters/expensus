import Koa from 'koa'
import {
  CreateGroupParams,
  CreateGroupResponseBody,
  FetchGroupResponseBody,
} from '../../types/api/group.types'
import { Group } from '../db/entities/Group'
import { User } from '../db/entities/User'

interface CreateGroupRequest extends Koa.Request {
  body: CreateGroupParams
}
interface CreateGroupContext extends Koa.Context {
  user: User
  request: CreateGroupRequest
  body: CreateGroupResponseBody
}

const createGroup = async (ctx: CreateGroupContext, next) => {
  const { name } = ctx.request.body
  const user = ctx.user
  const group = await Group.findOne(user.groupId)
  if (group) {
    ctx.throw(422, 'User already member of group')
  } else {
    // TODO: factor this out into model or service layer
    const newGroup = new Group()
    newGroup.name = name
    newGroup.owner = user
    newGroup.users = [user]
    await newGroup.save()
    ctx.status = 201
    ctx.body = { group: newGroup.toObjectForClient() }
  }
}

interface GetGroupContext extends Koa.Context {
  user: User
  body: FetchGroupResponseBody
}

const getGroup = async (ctx: GetGroupContext, next) => {
  const { user } = ctx
  const group = await Group.findOne(user.groupId)
  if (!group) {
    ctx.body = { group: null }
  } else {
    ctx.body = { group: group.toObjectForClient() }
  }
}

const GroupController = {
  createGroup,
  getGroup,
}

export default GroupController
