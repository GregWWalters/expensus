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
import { GroupCreate } from './GroupCreate'

interface StateProps {
  loadGroupState: ApiState
  group: GroupForClient | null
}

type Props = StateProps & RouteComponentProps<{}>

const Group: React.SFC<Props> = ({ group, loadGroupState, match }) => {
  if (group) {
    return (
      <FlexWindow className="group" flex="column">
        <Switch>
          <Route
            path={`${match.url}/view`}
            render={() => <div>Group-view</div>}
          />
          <Redirect to={`${match.url}/view`} />
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
