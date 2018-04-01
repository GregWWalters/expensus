import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ApiState, RequestState } from '../../../types'
import State from '../../../types/state'
import { ItemForClient } from '../../../types/state/item'
import { submitItemRequest } from '../../actions/ItemActions'
import {
  selectItems,
  selectLoadItemsState,
  selectSubmitItemState,
} from '../../state/selectors/itemState'
import { ItemListItem } from '../item/ListItem'
import { Button } from '../shared/Button'
import { Column, HorizontalDivider } from '../shared/Layouts'
import { FlexWindow } from '../shared/Layouts'
import { RowSpinner } from '../shared/Spinners'

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

const plaidExists = () =>
  (window as any).Plaid && typeof (window as any).Plaid.create === 'function'

type Props = StateProps & DispatchProps

class Accounts extends React.PureComponent<Props> implements PlaidLinkable {
  readonly plaidHandler

  constructor(props: Props) {
    super(props)

    // todo: type plaid better
    if (plaidExists()) {
      this.plaidHandler = (window as any).Plaid.create({
        clientName: 'Expensus',
        env: process.env.PLAID_API_ENV,
        key: process.env.PLAID_API_KEY,
        product: ['transactions'],
        onSuccess: (token, meta) => {
          props.submitItemRequest(token)
        },
      })
    } else {
      console.warn('Plaid not found. Account linking blocked')
    }
  }

  render() {
    const { items, loadItemsState, submitItemState } = this.props
    if (items) {
      return (
        <Column width="700px" className="group-accounts" overflow="hidden">
          <div className="group-accounts__header-container">
            <div className="group-accounts__header">Accounts</div>
            <div className="group-accounts__add-account-button">
              <Button
                disabled={!this.plaidHandler}
                onClick={this.handleAddAccountClick}>
                Add New Account
              </Button>
            </div>
          </div>
          <HorizontalDivider />
          <Column>
            {items.map(item => <ItemListItem key={item.id} item={item} />)}
            {submitItemState.status === RequestState.REQUESTING && (
              <RowSpinner />
            )}
          </Column>
        </Column>
      )
    } else if (loadItemsState.status === RequestState.REQUESTING) {
      return <FlexWindow className="spinner spinner--dark" />
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
)(Accounts)

export { connected as Accounts }
