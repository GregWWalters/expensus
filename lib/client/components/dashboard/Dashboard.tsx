import React from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { FlexWindow } from '../shared/Layouts'
import { Transactions } from '../transaction/Transactions'
import { DashboardNav } from './DashboardNav'
import { Home } from './Home'

const Dashboard: React.SFC<RouteComponentProps<{}>> = ({ match }) => (
  <FlexWindow className="dashboard" flex="column">
    <DashboardNav />
    <Switch>
      <Route path={`${match.url}/home`} component={Home} />
      <Route path={`${match.url}/transactions`} component={Transactions} />
      <Route
        path={`${match.url}/analysis`}
        render={() => <div>analysis</div>}
      />
      <Redirect to={`${match.url}/home`} />
    </Switch>
  </FlexWindow>
)

export { Dashboard }
