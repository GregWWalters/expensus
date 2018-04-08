import React from 'react'
import { connect } from 'react-redux'
import State from '../../../types/state'
import { TransactionForClient } from '../../../types/state/transaction'
import { closeEditTransactionModal } from '../../actions/TransactionActions'
import {
  selectIsEditTransactionModalOpen,
  selectTransactionById,
} from '../../state/selectors/transactionState'
import { Modal } from '../shared/Modal'
import { EditTransactionForm } from './EditTransactionForm'

interface StateProps {
  transaction: TransactionForClient | null
}

interface DispatchProps {
  close: () => void
}

type Props = StateProps & DispatchProps

const EditTransactionModal: React.SFC<Props> = ({ close, transaction }) => (
  <Modal
    className="edit-transaction-modal"
    isOpen={!!transaction}
    onCloseClick={close}
    title="Edit Transaction">
    {transaction && (
      <EditTransactionForm cancelClick={close} transaction={transaction} />
    )}
  </Modal>
)

const connected = connect<StateProps, DispatchProps, {}, State>(
  state => {
    const openFor = selectIsEditTransactionModalOpen(state)
    return {
      transaction: selectTransactionById(state, openFor),
    }
  },
  dispatch => ({ close: () => dispatch(closeEditTransactionModal()) })
)(EditTransactionModal)

export { connected as EditTransactionModal }
