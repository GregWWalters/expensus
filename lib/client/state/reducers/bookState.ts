import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { RequestState } from '../../../types'
import { BookState } from '../../../types/state/book'
import {
  addBook,
  loadBooks,
  loadBooksError,
  setBooks,
  submitBook,
  submitBookError,
  updatedBook,
  updateBook,
  updateBookError,
} from '../../actions/BookActions'
import { bookState } from '../defaultState'

// === Combined BookState reducer
const booksReducer = createReducer<BookState['books']>({}, bookState.books)
const loadBooksReducer = createReducer<BookState['loadBooks']>(
  {},
  bookState.loadBooks
)
const submitBookReducer = createReducer<BookState['submitBook']>(
  {},
  bookState.submitBook
)
const updateBookReducer = createReducer<BookState['updateBook']>(
  {},
  bookState.updateBook
)

const bookStateReducer = combineReducers<BookState>({
  books: booksReducer,
  loadBooks: loadBooksReducer,
  submitBook: submitBookReducer,
  updateBook: updateBookReducer,
})
export default bookStateReducer

// === Books Reducer Handlers
booksReducer.on(setBooks, (state, books) => books)
booksReducer.on(addBook, (state, book) => [...state, book])
booksReducer.on(updatedBook, (state, book) =>
  state.map(b => (b.id === book.id ? book : b))
)

// === LoadBooks State Reducer Handlers
loadBooksReducer.on(setBooks, (state, books) => ({
  error: null,
  status: RequestState.COMPLETED,
}))

loadBooksReducer.on(loadBooks, state => ({
  error: null,
  status: RequestState.REQUESTING,
}))

loadBooksReducer.on(loadBooksError, (state, error) => ({
  error,
  status: RequestState.ERROR,
}))

// === SubmitBook State Reducer Handlers
submitBookReducer.on(addBook, (state, book) => ({
  error: null,
  status: RequestState.COMPLETED,
}))

submitBookReducer.on(submitBook, state => ({
  error: null,
  status: RequestState.REQUESTING,
}))

submitBookReducer.on(submitBookError, (state, error) => ({
  error,
  status: RequestState.ERROR,
}))

// === UpdateBook State Reducer Handlers
updateBookReducer.on(updateBook, (state, id) => ({
  error: null,
  status: RequestState.REQUESTING,
  id,
}))

updateBookReducer.on(updatedBook, (state, book) => ({
  ...state,
  error: null,
  status: RequestState.COMPLETED,
}))

updateBookReducer.on(updateBookError, (state, error) => ({
  ...state,
  error,
  status: RequestState.ERROR,
}))
