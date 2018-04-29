import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ApiState, RequestState } from '../../../types'
import State from '../../../types/state'
import { TransactionForClient } from '../../../types/state/transaction'
import {
  selectLoadTransactions,
  selectUnallocatedTransactions,
} from '../../state/selectors/transactionState'
import { Column, HorizontalDivider } from '../shared/Layouts'
import { RowSpinner } from '../shared/Spinners'
import { TransactionListItem } from './ListItem'

interface StateProps {
  transactions: ReadonlyArray<TransactionForClient>
  loadTransactions: ApiState
}

const UnallocatedTransactions: React.SFC<StateProps> = ({
  transactions,
  loadTransactions,
}) => (
  <Column className="transactions" maxWidth="700px">
    <div className="transactions__header">Recent Transactions</div>
    <div className="transactions__sub-header">
      Your most recent unallocated transactions are below, be sure to allocate
      them soon while you remember what the transactions were for! To see all
      your transactions, click <Link to="/dashboard/transactions">here</Link>.
    </div>
    <HorizontalDivider />
    {transactions.length ||
    loadTransactions.status === RequestState.COMPLETED ? (
      <Column maxWidth="700px">
        {transactions.map(txn => (
          <TransactionListItem key={txn.id} transaction={txn} />
        ))}
      </Column>
    ) : (
      <RowSpinner />
    )}
  </Column>
)

const connected = connect<StateProps, {}, {}, State>(state => ({
  loadTransactions: selectLoadTransactions(state),
  transactions: selectUnallocatedTransactions(state),
}))(UnallocatedTransactions)

export { connected as UnallocatedTransactions }
