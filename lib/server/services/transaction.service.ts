import { NewAllocation } from '../../types/Allocation'
import { Allocation } from '../db/entities/Allocation'
import { Transaction } from '../db/entities/Transaction'

export const allocateTransaction = async (
  transaction: Transaction & { allocations: Allocation[] },
  allocations: ReadonlyArray<NewAllocation>
): Promise<Transaction> => {
  // first remove existing allocations
  await Promise.all(transaction.allocations.map(al => al.remove()))

  for (const allocation of allocations) {
    const newAllocation = new Allocation()
    newAllocation.amount = allocation.amount
    newAllocation.bookId = allocation.bookId
    newAllocation.transactionId = transaction.id
    await newAllocation.save()
  }

  await transaction.reload()
  return transaction
}
