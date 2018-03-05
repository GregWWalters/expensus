import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import State from '../../../../types/state'
import { submitItemRequest } from '../../../actions/ItemActions'
import { Button } from '../../shared/Button'
import { Column } from '../../shared/Layouts'

interface DispatchProps {
  submitItemRequest: (token: string) => void
}

interface PlaidLinkable {
  plaidHandler: any
}

type Props = DispatchProps

class GroupAccounts extends React.PureComponent<Props>
  implements PlaidLinkable {
  readonly plaidHandler

  constructor(props: Props) {
    super(props)

    // todo: type plaid better
    this.plaidHandler = (window as any).Plaid.create({
      clientName: 'Expensus',
      env: process.env.PLAID_API_ENV,
      key: process.env.PLAID_API_KEY,
      product: ['transactions'],
      onSuccess: (token, meta) => {
        props.submitItemRequest(token)
      },
    })
  }

  render() {
    return (
      <Column width="700px">
        <div>Account Management</div>
        <Button onClick={() => this.plaidHandler.open()}>Open Plaid</Button>
      </Column>
    )
  }
}

const connected = connect<{}, DispatchProps, {}, State>(
  null,
  (dispatch: Dispatch<State>) => ({
    submitItemRequest: (token: string) => dispatch(submitItemRequest(token)),
  })
)(GroupAccounts)

export { connected as GroupAccounts }
