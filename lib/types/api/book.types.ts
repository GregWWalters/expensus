import { BookForClient } from '../state/book'

export interface CreateBookParams {
  name: string
}

export interface CreateBookResponseBody {
  book: BookForClient
}

export interface GetBooksResponseBody {
  books: ReadonlyArray<BookForClient>
}
