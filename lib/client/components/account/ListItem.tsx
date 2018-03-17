import React from 'react'
import { AccountForClient } from '../../../types/state/item'
import { Icon } from '../shared/Icon'

interface Props {
  account: AccountForClient
}

const AccountListItem: React.SFC<Props> = ({ account }) => (
  <div className="account-list-item">
    <div className="account-list-item__icon">
      {/* TODO: make this icon dependent on account type */}
      <Icon iconName="credit-card" size="small" />
    </div>
    <div className="account-list-item__name">{account.name}</div>
    <div className="account-list-item__mask">{`xxxx-${account.mask}`}</div>
  </div>
)

export { AccountListItem }
