import { TransactionForClient } from '../state/transaction'

export interface GetTransactionsParams {
  itemId?: string
}

export interface GetTransactionsResponseBody {
  transactions: ReadonlyArray<TransactionForClient>
}
