import { createAction } from 'redux-act'
import { ClientApiError } from '../../types/api'
import { CreateBookParams } from '../../types/api/book.types'
import { BookForClient } from '../../types/state/book'

export const setBooks = createAction<ReadonlyArray<BookForClient>>('SET_BOOKS')
export const loadBooks = createAction('LOAD_BOOKS')
export const loadBooksError = createAction<ClientApiError>('LOAD_BOOKS_ERROR')
export const submitBook = createAction<CreateBookParams>('SUBMIT_BOOK')
export const submitBookError = createAction<ClientApiError>('SUBMIT_BOOK_ERROR')
export const addBook = createAction<BookForClient>('ADD_BOOK')
