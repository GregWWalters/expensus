import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { ApiState, RequestState } from '../../../types'
import State from '../../../types/state'
import { GroupForClient } from '../../../types/state/group'
import {
  selectGroup,
  selectLoadGroupState,
} from '../../state/selectors/groupState'
import { FlexWindow } from '../shared/Layouts'
import { GroupAccounts } from './groupAccounts/GroupAccounts'
import { GroupCreate } from './GroupCreate'
import { GroupInfo } from './groupInfo/GroupInfo'
import { GroupNav } from './GroupNav'

interface StateProps {
  loadGroupState: ApiState
  group: GroupForClient | null
}

type Props = StateProps & RouteComponentProps<{}>

const Group: React.SFC<Props> = ({ group, loadGroupState, match }) => {
  if (group) {
    return (
      <FlexWindow className="group" flex="column">
        <GroupNav />
        <Switch>
          <Route path={`${match.url}/info`} component={GroupInfo} />
          <Route path={`${match.url}/accounts`} component={GroupAccounts} />
          <Redirect to={`${match.url}/info`} />
        </Switch>
      </FlexWindow>
    )
  } else if (loadGroupState.status === RequestState.REQUESTING) {
    return <FlexWindow className="spinner spinner--dark" />
  } else {
    return (
      <FlexWindow className="group" flex="column">
        <Switch>
          <Route path={`${match.url}/create`} component={GroupCreate} />
          <Redirect to={`${match.url}/create`} />
        </Switch>
      </FlexWindow>
    )
  }
}

const connected = connect<StateProps, {}, {}, State>(state => ({
  loadGroupState: selectLoadGroupState(state),
  group: selectGroup(state),
}))(Group)

export { connected as Group }
