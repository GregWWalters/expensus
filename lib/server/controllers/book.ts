import Koa from 'koa'
import {
  CreateBookParams,
  CreateBookResponseBody,
  GetBooksResponseBody,
  UpdateBookParams,
  UpdateBookResponseBody,
} from '../../types/api/book'
import { GroupAuthedContext } from '../../types/controller'
import { Book } from '../db/entities/Book'

interface CreateBookRequest extends Koa.Request {
  body: CreateBookParams
}
interface CreateBookContext extends GroupAuthedContext {
  request: CreateBookRequest
  body: CreateBookResponseBody
}

const createBook = async (ctx: CreateBookContext, next) => {
  const { name } = ctx.request.body
  const { group } = ctx

  // TODO: extract this into either the model or a service layer
  const newBook = new Book()
  newBook.groupId = group.id
  newBook.name = name
  await newBook.save()
  ctx.status = 201
  ctx.body = { book: newBook }
}

interface GetBooksContext extends GroupAuthedContext {
  body: GetBooksResponseBody
}

const getBooks = async (ctx: GetBooksContext, next) => {
  const { group } = ctx
  const books = await Book.find({ where: { groupId: group.id } })
  ctx.status = books.length ? 200 : 204
  ctx.body = { books }
}

interface UpdateBookRequest extends Koa.Request {
  body: UpdateBookParams
}

interface UpdateBookContext extends GroupAuthedContext {
  request: UpdateBookRequest
  body: UpdateBookResponseBody
  params: { id: string }
}

const updateBook = async (ctx: UpdateBookContext, next) => {
  const { id } = ctx.params
  const { name } = ctx.request.body

  const book = await Book.findOne(id)

  if (!book) return ctx.throw(404, 'Book not found')
  if (!name) return ctx.throw(400, 'Name required to update book name')

  book.name = name
  await book.save()
  ctx.status = 200
  ctx.body = { book }
}

const BookController = {
  createBook,
  getBooks,
  updateBook,
}

export default BookController
