import React from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { FlexWindow } from '../shared/Layouts'
import { GroupCreate } from './GroupCreate'

type Props = RouteComponentProps<{}>

const Group: React.SFC<Props> = ({ match }) => (
  <FlexWindow className="group" flex="column">
    <Switch>
      <Route path={`${match.url}/create`} component={GroupCreate} />
      <Route path={`${match.url}/view`} render={() => <div>Group-view</div>} />
      <Redirect to={`${match.url}/view`} />
    </Switch>
  </FlexWindow>
)

export { Group }
