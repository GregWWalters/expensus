import c from 'classnames'
import m from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import State from '../../../types/state'
import { TransactionForClient } from '../../../types/state/transaction'
import { openEditTransactionModal } from '../../actions/TransactionActions'
import { isCurrentYear } from '../../utils/date'
import { formatTransactionAmount } from '../../utils/money'
import { TransactionBook } from './TransactionBook'
import { TransactionCategory } from './TransactionCategory'

interface OwnProps {
  transaction: TransactionForClient
}

interface DispatchProps {
  openEditModal: () => void
}

type Props = OwnProps & DispatchProps

const TransactionListItem: React.SFC<Props> = ({
  openEditModal,
  transaction,
}) => (
  <div className="transaction-list-item" onClick={() => openEditModal()}>
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

const connected = connect<{}, DispatchProps, OwnProps, State>(
  null,
  (dispatch, props) => ({
    openEditModal: () =>
      dispatch(openEditTransactionModal(props.transaction.id)),
  })
)(TransactionListItem)

export { connected as TransactionListItem }
