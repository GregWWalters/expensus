import Router from 'koa-router'
import BookController from '../controllers/book.controller'

const book = new Router()
book.get('/', BookController.getBooks)
book.post('/create', BookController.createBook)
book.put('/update/:id', BookController.updateBook)

export default book
