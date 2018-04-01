import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import State from '../../../types/state'
import { GroupForClient } from '../../../types/state/group'
import GroupRequiredError from '../../errors/GroupRequiredError'
import { selectGroup } from '../../state/selectors/groupState'
import { Column, HorizontalDivider } from '../shared/Layouts'
import { UserListItem } from '../user/ListItem'

interface StateProps {
  group: GroupForClient | null
}

type Props = StateProps & RouteComponentProps<{}>

const GroupInfo: React.SFC<Props> = ({ group }) => {
  if (!group) throw new GroupRequiredError('Group info requires a group')

  return (
    <Column className="group-info" maxWidth="700px" padding={true}>
      <div className="group-info__header">{group.name}</div>
      <HorizontalDivider />
      <div>
        <div className="group-info__sub-header">Owner</div>
        <UserListItem user={group.owner} />
      </div>
      <HorizontalDivider />
      {group.users.length > 1 ? (
        <>
          <div className="group-info__sub-header">Members</div>
          {group.users.map(
            (user, i) =>
              user.id === group.owner.id ? null : (
                <UserListItem user={user} key={i} />
              )
          )}
        </>
      ) : (
        <div className="group-info__invite-friends">
          Looks like there's no one in your group, why don't you invite someone
          to join you?
        </div>
      )}
    </Column>
  )
}

const connected = connect<StateProps, {}, {}, State>(state => ({
  group: selectGroup(state),
}))(GroupInfo)

export { connected as GroupInfo }
