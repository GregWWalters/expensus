import { Book } from '../../server/db/entities/Book'
import { ApiState } from '../index'

export interface BookForClient {
  id: Book['id']
  name: Book['name']
  groupId: Book['groupId']
}

export interface BookState {
  loadBooks: ApiState
  submitBook: ApiState
  books: ReadonlyArray<BookForClient>
}
