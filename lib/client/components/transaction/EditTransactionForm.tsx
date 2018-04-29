import c from 'classnames'
import m from 'moment'
import React, { FormEvent } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { ApiState, RequestState } from '../../../types'
import { UpdateTransactionParams } from '../../../types/api/transaction.types'
import State from '../../../types/state'
import { BookForClient } from '../../../types/state/book'
import { TransactionForClient } from '../../../types/state/transaction'
import { submitUpdateTransactionRequest } from '../../actions/TransactionActions'
import { selectBooks } from '../../state/selectors/bookState'
import { selectSubmitTransactionsState } from '../../state/selectors/transactionState'
import { formatTransactionAmount } from '../../utils/money'
import { Button } from '../shared/Button'

interface OwnProps {
  transaction: TransactionForClient
  cancelClick: () => void
}

interface StateProps {
  books: ReadonlyArray<BookForClient>
  submitTransactionState: ApiState
}

interface DispatchProps {
  submitTransaction: (params: UpdateTransactionParams) => void
}

interface OwnState {
  selectedBook: number | undefined
}

type Props = OwnProps & StateProps & DispatchProps

interface BookOption {
  label: string
  value: number
}

class EditTransactionForm extends React.PureComponent<Props, OwnState> {
  constructor(props: Props) {
    super(props)
    const { transaction } = this.props
    const currentBook =
      transaction.allocations.length && transaction.allocations[0].bookId
    this.state = { selectedBook: currentBook || undefined }
  }

  render() {
    const { books, cancelClick, transaction } = this.props
    const bookOptions: BookOption[] = books.map(book => ({
      value: book.id,
      label: book.name,
    }))
    return (
      <form className="edit-transaction" onSubmit={this.handleSubmit}>
        <div className="edit-transaction-info">
          <div className="edit-transaction-info__date">
            {m(transaction.date).format('MM/D/YY')}
          </div>
          <div className="edit-transaction-info__name">{transaction.name}</div>
          <div className="edit-transaction-info__amount">
            {formatTransactionAmount(transaction.amount || 0)}
          </div>
        </div>
        <div className="edit-transaction__selector-container">
          <div className="book-selector">
            <div className="book-selector__label">Book:</div>
            <Select
              className="book-selector__selector"
              name="book"
              onChange={this.handleBookSelectChange}
              options={bookOptions}
              value={this.state.selectedBook || undefined}
            />
          </div>
        </div>
        <div className="edit-transaction__button-container">
          <Button
            disabled={this.submitting}
            className={c(
              'edit-transaction__button',
              'edit-transaction__button--cancel'
            )}
            onClick={cancelClick}>
            Cancel
          </Button>
          <Button
            loading={this.submitting}
            className={c(
              'edit-transaction__button',
              'edit-transaction__button--confirm'
            )}
            type="submit">
            Save
          </Button>
        </div>
      </form>
    )
  }

  handleBookSelectChange = (selectedOption: BookOption | null) => {
    this.setState({
      selectedBook: selectedOption ? selectedOption.value : undefined,
    })
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { submitTransaction, transaction } = this.props
    const { selectedBook } = this.state
    const params: UpdateTransactionParams = {
      transaction,
      newAllocations:
        selectedBook !== undefined
          ? [{ amount: transaction.amount || 0, bookId: selectedBook }]
          : undefined,
    }
    submitTransaction(params)
  }

  get submitting() {
    return this.props.submitTransactionState.status === RequestState.REQUESTING
  }
}

const connected = connect<StateProps, DispatchProps, OwnProps, State>(
  state => ({
    books: selectBooks(state),
    submitTransactionState: selectSubmitTransactionsState(state),
  }),
  dispatch => ({
    submitTransaction: params =>
      dispatch(submitUpdateTransactionRequest(params)),
  })
)(EditTransactionForm)

export { connected as EditTransactionForm }
