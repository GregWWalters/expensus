import React from 'react'
import { connect } from 'react-redux'
import State from '../../../types/state'
import { closeEditTransactionModal } from '../../actions/TransactionActions'
import { selectIsEditTransactionModalOpen } from '../../state/selectors/transactionState'
import { Modal } from '../shared/Modal'

interface StateProps {
  isOpen: boolean
}

interface DispatchProps {
  close: () => void
}

type Props = StateProps & DispatchProps

const EditTransactionModal: React.SFC<Props> = ({ isOpen, close }) => (
  <Modal isOpen={isOpen} onCloseClick={close} title="Edit Transaction">
    <div>OMG it's the edit transaction modal!</div>
  </Modal>
)

const connected = connect<StateProps, DispatchProps, {}, State>(
  state => ({ isOpen: selectIsEditTransactionModalOpen(state) }),
  dispatch => ({ close: () => dispatch(closeEditTransactionModal()) })
)(EditTransactionModal)

export { connected as EditTransactionModal }
