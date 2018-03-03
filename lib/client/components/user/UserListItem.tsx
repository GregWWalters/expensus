import React from 'react'
import { UserForClient } from '../../../types/state/user'
import { Icon } from '../shared/Icon'

interface Props {
  user: UserForClient
}

const UserListItem: React.SFC<Props> = ({ user }) => (
  <div className="user-list-item">
    <div className="user-list-item__icon">
      <Icon iconName="account-circle" />
    </div>
    <div className="user-list-item__name">
      {user.firstName} {user.lastName}
    </div>
    <div className="user-list-item__email">{user.email}</div>
    <div className="user-list-item__actions">
      <div>None</div>
    </div>
  </div>
)

export { UserListItem }
