import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import State from '../../../../types/state'
import { GroupForClient } from '../../../../types/state/group'
import GroupRequiredError from '../../../errors/GroupRequiredError'
import { selectGroup } from '../../../state/selectors/groupState'
import { Column, HorizontalDivider } from '../../shared/Layouts'

interface StateProps {
  group: GroupForClient | null
}

type Props = StateProps & RouteComponentProps<{}>

const GroupInfo: React.SFC<Props> = ({ group }) => {
  if (!group) throw new GroupRequiredError('Group info requires a group')
  return (
    <Column className="group-info" width="700px">
      <div className="group-info__header">{group.name}</div>
      <HorizontalDivider />
      <div>Owner and Member info goes here...</div>
      <HorizontalDivider />
      <div>Invite additional members goes here...</div>
    </Column>
  )
}

const connected = connect<StateProps, {}, {}, State>(state => ({
  group: selectGroup(state),
}))(GroupInfo)

export { connected as GroupInfo }
