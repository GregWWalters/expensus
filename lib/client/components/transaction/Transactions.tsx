import React from 'react'
import { connect } from 'react-redux'
import { ApiState, RequestState } from '../../../types'
import State from '../../../types/state'
import { TransactionForClient } from '../../../types/state/transaction'
import {
  selectLoadTransactions,
  selectTransactions,
} from '../../state/selectors/transactionState'
import { Column, HorizontalDivider } from '../shared/Layouts'
import { RowSpinner } from '../shared/Spinners'
import { TransactionListItem } from './ListItem'

interface StateProps {
  transactions: ReadonlyArray<TransactionForClient>
  loadTransactions: ApiState
}

const Transactions: React.SFC<StateProps> = ({
  transactions,
  loadTransactions,
}) => (
  <Column className="transactions" maxWidth="700px">
    <div className="transactions__header">Transactions</div>
    <div className="transactions__sub-header">
      Your most recent transactions are below, starting with those you have not
      yet allocated to a book. Be sure to allocate them soon while you remember
      what the transactions were for!
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
  transactions: selectTransactions(state),
}))(Transactions)

export { connected as Transactions }
