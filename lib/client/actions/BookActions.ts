import { createAction } from 'redux-act'
import { ThunkAction } from 'redux-thunk'
import { ClientApiError } from '../../types/api'
import { CreateBookParams } from '../../types/api/book.types'
import State from '../../types/state'
import { BookForClient } from '../../types/state/book'
import BookResource from '../api/resources/book.resource'
import UserRequiredError from '../errors/UserRequiredError'
import { selectUser } from '../state/selectors/userState'

export const setBooks = createAction<ReadonlyArray<BookForClient>>('SET_BOOKS')
export const loadBooks = createAction('LOAD_BOOKS')
export const loadBooksError = createAction<ClientApiError>('LOAD_BOOKS_ERROR')
export const submitBook = createAction<CreateBookParams>('SUBMIT_BOOK')
export const submitBookError = createAction<ClientApiError>('SUBMIT_BOOK_ERROR')
export const addBook = createAction<BookForClient>('ADD_BOOK')

export const fetchBooks = (): ThunkAction<Promise<void>, State, null> => async (
  dispatch,
  getState
) => {
  const user = selectUser(getState())
  if (!user) throw new UserRequiredError('User required to load group')
  if (!user.groupId) {
    // if user not a member of a group, set null and status will go to 'loaded'
    dispatch(setBooks([]))
    return
  }

  dispatch(loadBooks())
  const bookApi = new BookResource(getState(), dispatch)
  const resp = await bookApi.fetchBooks()

  if ('err' in resp) {
    dispatch(loadBooksError(resp.err))
    return
  }

  dispatch(setBooks(resp.books))
}
