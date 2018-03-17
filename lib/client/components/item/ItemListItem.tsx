import React from 'react'
import { ItemForClient } from '../../../types/state/item'
import { AccountListItem } from '../account/ListItem'
import { Icon } from '../shared/Icon'

interface OwnState {
  expanded: boolean
}

interface Props {
  item: ItemForClient
}

class ItemListItem extends React.PureComponent<Props, OwnState> {
  constructor(props: Props) {
    super(props)
    this.state = { expanded: false }
  }

  render() {
    const { item } = this.props
    const { expanded } = this.state
    return (
      <>
        <div className="item-list-item">
          <div onClick={this.handleExpand} className="item-list-item__expand">
            {expanded ? (
              <Icon iconName="chevron-down" />
            ) : (
              <Icon iconName="chevron-right" />
            )}
          </div>
          <div className="item-list-item__icon">
            <Icon iconName="bank" />
          </div>
          <div className="item-list-item__name">{item.name}</div>
          <div className="item-list-item__actions">
            <div>None</div>
          </div>
        </div>
        <div className="item-list-item__account-container">
          {expanded &&
            item.accounts.map(account => (
              <AccountListItem key={account.id} account={account} />
            ))}
        </div>
      </>
    )
  }

  handleExpand = () => {
    this.setState({ expanded: !this.state.expanded })
  }
}

export { ItemListItem }
