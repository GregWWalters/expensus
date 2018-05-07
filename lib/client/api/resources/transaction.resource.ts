import {
  GetTransactionsParams,
  GetTransactionsResponseBody,
  UpdateTransactionParams,
  UpdateTransactionResponseBody,
} from '../../../types/api/transaction'
import { ApiResource } from '../ApiResource'

export default class TransactionResource extends ApiResource {
  async getTransactions(params?: GetTransactionsParams) {
    try {
      // @TODO: add support for by-item-id restrictions
      const resp = await this.req.get<GetTransactionsResponseBody>(
        '/transaction',
        { headers: this.defaultHeaders }
      )
      return resp.data
    } catch (err) {
      return this.handleError(err)
    }
  }

  async updateTransaction(params: UpdateTransactionParams) {
    try {
      const resp = await this.req.put<UpdateTransactionResponseBody>(
        `/transaction/${params.transaction.id}/update`,
        params,
        { headers: this.defaultHeaders }
      )
      return resp.data
    } catch (err) {
      return this.handleError(err)
    }
  }
}
