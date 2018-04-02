import React from 'react'
import { TransactionForClient } from '../../../types/state/transaction'

interface Props {
  transaction: TransactionForClient
}

const TransactionCategory: React.SFC<Props> = ({ transaction }) => (
  <div className="transaction-list-item__category">
    {transaction.category
      ? transaction.category[transaction.category.length - 1]
      : ''}
  </div>
)

export { TransactionCategory }
