import c from 'classnames'
import m from 'moment'
import React from 'react'
import { TransactionForClient } from '../../../types/state/transaction'
import { isCurrentYear } from '../../utils/date'
import { formatTransactionAmount } from '../../utils/money'
import { TransactionBook } from './TransactionBook'
import { TransactionCategory } from './TransactionCategory'

interface OwnProps {
  transaction: TransactionForClient
}

const TransactionListItem: React.SFC<OwnProps> = ({ transaction }) => (
  <div className="transaction-list-item">
    <div className="transaction-list-item__date">
      {isCurrentYear(m(transaction.date))
        ? m(transaction.date).format('MMM-D')
        : m(transaction.date).format('MM/D/YY')}
    </div>
    <div className="transaction-list-item__name">{transaction.name}</div>
    <div
      className={c('transaction-list-item__amount', {
        'transaction-list-item__amount--positive': Boolean(
          transaction.amount && transaction.amount < 0
        ),
        'transaction-list-item__amount--negative': Boolean(
          transaction.amount && transaction.amount > 0
        ),
      })}>
      {formatTransactionAmount(transaction.amount || 0)}
    </div>
    <TransactionCategory transaction={transaction} />
    <TransactionBook transaction={transaction} />
  </div>
)

export { TransactionListItem }
