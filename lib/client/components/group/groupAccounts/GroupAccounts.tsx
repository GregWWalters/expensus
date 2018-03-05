import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import State from '../../../../types/state'
import { ItemForClient } from '../../../../types/state/item'
import { submitItemRequest } from '../../../actions/ItemActions'
import { selectItems } from '../../../state/selectors/itemState'
import { Button } from '../../shared/Button'
import { Column } from '../../shared/Layouts'

interface StateProps {
  items: ReadonlyArray<ItemForClient>
}

interface DispatchProps {
  submitItemRequest: (token: string) => void
}

interface PlaidLinkable {
  plaidHandler: any
}

type Props = StateProps & DispatchProps

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
        <h2>Account Management</h2>
        {this.props.items.map(item => (
          <div key={item.id}>{item.institutionId}</div>
        ))}
        <Button onClick={() => this.plaidHandler.open()}>Add Bank</Button>
      </Column>
    )
  }
}

const connected = connect<{}, DispatchProps, {}, State>(
  state => ({
    items: selectItems(state),
  }),
  (dispatch: Dispatch<State>) => ({
    submitItemRequest: (token: string) => dispatch(submitItemRequest(token)),
  })
)(GroupAccounts)

export { connected as GroupAccounts }
