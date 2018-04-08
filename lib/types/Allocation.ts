import { Allocation } from '../server/db/entities/Allocation'

export interface AllocationForClient {
  id: Allocation['id']
  amount: Allocation['amount']
  transactionId: Allocation['transactionId']
  bookId: Allocation['bookId']
}

export interface NewAllocation {
  amount: Allocation['amount']
  bookId: Allocation['bookId']
}
