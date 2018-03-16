import {
  CreateBookParams,
  CreateBookResponseBody,
  GetBooksResponseBody,
} from '../../../types/api/book.types'
import { ApiResource } from '../ApiResource'

export default class BookResource extends ApiResource {
  async fetchBooks() {
    try {
      const resp = await this.req.get<GetBooksResponseBody>('/book', {
        headers: this.defaultHeaders,
      })
      return resp.data
    } catch (err) {
      return this.handleError(err)
    }
  }

  async createBook(bookName: string) {
    try {
      const params: CreateBookParams = { name: bookName }
      const resp = await this.req.post<CreateBookResponseBody>(
        '/book/create',
        params,
        { headers: this.defaultHeaders }
      )
      return resp.data
    } catch (err) {
      return this.handleError(err)
    }
  }
}
