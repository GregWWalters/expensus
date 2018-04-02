import React from 'react'
import { connect } from 'react-redux'
import State from '../../../types/state'
import { BookForClient } from '../../../types/state/book'
import { TransactionForClient } from '../../../types/state/transaction'
import { selectBooks } from '../../state/selectors/bookState'
import { isTransactionFullyAllocated } from '../../state/selectors/transactionState'

interface OwnProps {
  transaction: TransactionForClient
}

interface StateProps {
  books: ReadonlyArray<BookForClient>
}

type Props = OwnProps & StateProps

const TransactionBook: React.SFC<Props> = ({ books, transaction }) => (
  <div className="transaction-list-item__book">
    {transaction.allocations && isTransactionFullyAllocated(transaction)
      ? transaction.allocations
          .map(al => {
            const book = books.find(b => b.id === al.bookId)
            return book ? book.name : ''
          })
          .filter(name => !!name)
          .join(' ,')
      : 'Not allocated'}
  </div>
)

const connected = connect<StateProps, {}, OwnProps, State>(state => ({
  books: selectBooks(state),
}))(TransactionBook)

export { connected as TransactionBook }
