import Router from 'koa-router'
import BookController from '../controllers/book'

const book = new Router()
book.get('/', BookController.getBooks)
book.post('/create', BookController.createBook)
book.put('/update/:id', BookController.updateBook)

export default book
