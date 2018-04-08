import { NewAllocation } from '../Allocation'
import { TransactionForClient } from '../state/transaction'

export interface GetTransactionsParams {
  itemId?: string
}

export interface GetTransactionsResponseBody {
  transactions: ReadonlyArray<TransactionForClient>
}

export interface UpdateTransactionParams {
  transaction: TransactionForClient
  newAllocations?: ReadonlyArray<NewAllocation>
  // todo: handle newCategories here too
}

export interface UpdateTransactionResponseBody {
  transaction: TransactionForClient
}
