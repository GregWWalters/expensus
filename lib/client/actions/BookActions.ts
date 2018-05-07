import { createAction } from 'redux-act'
import { ThunkAction } from 'redux-thunk'
import { ClientApiError } from '../../types/api'
import { UpdateBookParams } from '../../types/api/book'
import State from '../../types/state'
import { BookForClient } from '../../types/state/book'
import BookResource from '../api/resources/book.resource'
import GroupRequiredError from '../errors/GroupRequiredError'
import UserRequiredError from '../errors/UserRequiredError'
import { selectUser } from '../state/selectors/userState'

export const setBooks = createAction<ReadonlyArray<BookForClient>>('SET_BOOKS')
export const loadBooks = createAction('LOAD_BOOKS')
export const loadBooksError = createAction<ClientApiError>('LOAD_BOOKS_ERROR')
export const submitBook = createAction('SUBMIT_BOOK')
export const submitBookError = createAction<ClientApiError>('SUBMIT_BOOK_ERROR')
export const addBook = createAction<BookForClient>('ADD_BOOK')
export const updateBook = createAction<number>('UPDATE_BOOK')
export const updatedBook = createAction<BookForClient>('UPDATED_BOOK')
export const updateBookError = createAction<ClientApiError>('UPDATE_BOOK_ERROR')

export const fetchBooks = (): ThunkAction<Promise<void>, State, null> => async (
  dispatch,
  getState
) => {
  const user = selectUser(getState())
  if (!user) throw new UserRequiredError('User required to fetch books')
  if (!user.groupId) {
    // if user not a member of a group, set empty array
    // and status will go to 'loaded'
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

export const submitCreateBookRequest = (
  bookName: string
): ThunkAction<Promise<void>, State, null> => async (dispatch, getState) => {
  const user = selectUser(getState())
  if (!user) throw new UserRequiredError('User required to create book')
  if (!user.groupId) {
    throw new GroupRequiredError('Group required to create book')
  }

  dispatch(submitBook())
  const bookApi = new BookResource(getState(), dispatch)
  const resp = await bookApi.createBook(bookName)

  if ('err' in resp) {
    dispatch(submitBookError(resp.err))
    return Promise.reject(resp.err)
  }

  dispatch(addBook(resp.book))
  return Promise.resolve()
}

export const submitUpdateBookRequest = (
  params: UpdateBookParams
): ThunkAction<Promise<void>, State, null> => async (dispatch, getState) => {
  const user = selectUser(getState())
  if (!user) throw new UserRequiredError('User required to create book')
  if (!user.groupId) {
    throw new GroupRequiredError('Group required to create book')
  }

  dispatch(updateBook(params.id))
  const bookApi = new BookResource(getState(), dispatch)
  const resp = await bookApi.updateBook(params)

  if ('err' in resp) {
    dispatch(updateBookError(resp.err))
    return Promise.reject(resp.err)
  }

  dispatch(updatedBook(resp.book))
  return Promise.resolve()
}
