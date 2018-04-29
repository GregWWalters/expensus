import React from 'react'
import { Icon } from '../shared/Icon'

const EditTransactionSuccess: React.SFC<{}> = () => (
  <div className="edit-transaction-success">
    <div className="edit-transaction-success__icon">
      <Icon iconName="check-circle" size="large" />
    </div>
    <div className="edit-transaction-success__message">
      Transaction updated successfully.
    </div>
  </div>
)

export { EditTransactionSuccess }
