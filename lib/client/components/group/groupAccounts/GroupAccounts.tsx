import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ApiState, RequestState } from '../../../../types'
import State from '../../../../types/state'
import { ItemForClient } from '../../../../types/state/item'
import { submitItemRequest } from '../../../actions/ItemActions'
import {
  selectItems,
  selectLoadItemsState,
  selectSubmitItemState,
} from '../../../state/selectors/itemState'
import { ItemListItem } from '../../item/ItemListItem'
import { Button } from '../../shared/Button'
import { Column, HorizontalDivider } from '../../shared/Layouts'
import { FlexWindow } from '../../shared/Layouts'
import { RowSpinner } from '../../shared/Spinners'

interface StateProps {
  items: ReadonlyArray<ItemForClient>
  loadItemsState: ApiState
  submitItemState: ApiState
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
    const { items, loadItemsState, submitItemState } = this.props
    if (loadItemsState.status === RequestState.REQUESTING) {
      return <FlexWindow className="spinner spinner--dark" />
    } else if (items) {
      return (
        <Column width="700px" className="group-accounts">
          <div className="group-accounts__header-container">
            <div className="group-accounts__header">Accounts</div>
            <div className="group-accounts__add-account-button">
              <Button onClick={this.handleAddAccountClick}>
                Add New Account
              </Button>
            </div>
          </div>
          <HorizontalDivider />
          {items.map(item => <ItemListItem key={item.id} item={item} />)}
          {submitItemState.status === RequestState.REQUESTING && <RowSpinner />}
          <HorizontalDivider />
        </Column>
      )
    }
  }

  handleAddAccountClick = () => {
    this.plaidHandler.open()
  }
}

const connected = connect<StateProps, DispatchProps, {}, State>(
  state => ({
    items: selectItems(state),
    loadItemsState: selectLoadItemsState(state),
    submitItemState: selectSubmitItemState(state),
  }),
  (dispatch: Dispatch<State>) => ({
    submitItemRequest: (token: string) => dispatch(submitItemRequest(token)),
  })
)(GroupAccounts)

export { connected as GroupAccounts }
