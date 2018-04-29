import React from 'react'
import { connect } from 'react-redux'
import { ApiState, RequestState } from '../../../types'
import State from '../../../types/state'
import { TransactionForClient } from '../../../types/state/transaction'
import { closeEditTransactionModal } from '../../actions/TransactionActions'
import {
  selectIsEditTransactionModalOpen,
  selectSubmitTransactionsState,
  selectTransactionById,
} from '../../state/selectors/transactionState'
import { Modal } from '../shared/Modal'
import { EditTransactionForm } from './EditTransactionForm'
import { EditTransactionSuccess } from './EditTransactionSuccess'

interface StateProps {
  transaction: TransactionForClient | null
  submitTransactionState: ApiState
}

interface DispatchProps {
  close: () => void
}

type Props = StateProps & DispatchProps

const EditTransactionModal: React.SFC<Props> = ({
  close,
  submitTransactionState,
  transaction,
}) => (
  <Modal
    className="edit-transaction-modal"
    isOpen={!!transaction}
    onCloseClick={close}
    title="Edit Transaction">
    {transaction ? (
      submitTransactionState.status === RequestState.COMPLETED ? (
        <EditTransactionSuccess />
      ) : (
        <EditTransactionForm cancelClick={close} transaction={transaction} />
      )
    ) : null}
  </Modal>
)

const connected = connect<StateProps, DispatchProps, {}, State>(
  state => {
    const openFor = selectIsEditTransactionModalOpen(state)
    return {
      submitTransactionState: selectSubmitTransactionsState(state),
      transaction: selectTransactionById(state, openFor),
    }
  },
  dispatch => ({ close: () => dispatch(closeEditTransactionModal()) })
)(EditTransactionModal)

export { connected as EditTransactionModal }
