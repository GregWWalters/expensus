import React from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { FlexWindow } from '../shared/Layouts'

type Props = RouteComponentProps<{}>

const Group: React.SFC<Props> = ({ match }) => (
  <FlexWindow className="group">
    <Switch>
      <Route
        path={`${match.url}/create`}
        render={() => <div>Group-create</div>}
      />
      <Route path={`${match.url}/view`} render={() => <div>Group-view</div>} />
      <Redirect to={`${match.url}/view`} />
    </Switch>
  </FlexWindow>
)

export { Group }
