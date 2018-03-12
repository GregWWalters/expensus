import Koa from 'koa'
import GroupRequiredError from '../../client/errors/GroupRequiredError'
import {
  CreateBookParams,
  CreateBookResponseBody,
  GetBooksResponseBody,
} from '../../types/api/book.types'
import { AuthedContext } from '../../types/controller'
import { Book } from '../db/entities/Book'
import { Group } from '../db/entities/Group'

interface CreateBookRequest extends Koa.Request {
  body: CreateBookParams
}
interface CreateBookContext extends AuthedContext {
  request: CreateBookRequest
  body: CreateBookResponseBody
}

const createBook = async (ctx: CreateBookContext, next) => {
  const { name } = ctx.request.body
  const { user } = ctx
  const group = await Group.findOneById(user.groupId)
  if (!group) {
    ctx.throw(422, 'Group required to create book')
    throw new GroupRequiredError('Group required to create a book')
  }

  // TODO: extract this into either the model or a service layer
  const newBook = new Book()
  newBook.groupId = group.id
  newBook.name = name
  await newBook.save()
  ctx.status = 201
  ctx.body = { book: newBook }
}

interface GetBookContext extends AuthedContext {
  body: GetBooksResponseBody
}

const getBooks = async (ctx: GetBookContext, next) => {
  const { user } = ctx
  const group = await Group.findOneById(user.groupId)
  if (!group) {
    ctx.throw(422, 'Group required to fetch books')
    throw new GroupRequiredError('Group required to fetch a book')
  }

  const books = await Book.find({ where: { groupId: group.id } })
  ctx.status = books.length ? 200 : 204
  ctx.body = { books }
}

const BookController = {
  createBook,
  getBooks,
}

export default BookController
