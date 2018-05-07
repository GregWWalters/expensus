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

export interface UpdateBookParams {
  id: number
  name: string
}

export interface UpdateBookResponseBody {
  book: BookForClient
}
