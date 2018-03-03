import 'mdi/css/materialdesignicons.css'
import '../css/index.scss'

import React from 'react'
import { connect } from 'react-redux'
import {
  withRouter,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom'

import { RequestState } from '../types'
import State from '../types/state'
import { UserForClient } from '../types/state/user'
import { Login } from './components/auth/Login'
import { Signup } from './components/auth/Signup'
import { Dashboard } from './components/dashboard/Dashboard'
import { Group } from './components/group/Group'
import { Header } from './components/layouts/Header'
import { FlexWindow, FullWindow } from './components/shared/Layouts'
import { selectLoadUserStatus, selectUser } from './state/selectors/userState'

interface StateProps {
  user: UserForClient | null
  loadUserStatus: RequestState
}

type Props = StateProps & RouteComponentProps<{}>

class App extends React.Component<Props> {
  render() {
    const { user, loadUserStatus } = this.props
    if (user) {
      return (
        <FullWindow flex="column">
          <Header />
          <FlexWindow flex="column">
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/group" component={Group} />
              <Route path="/user" render={() => <div>User</div>} />
              <Redirect to="/dashboard" />
            </Switch>
          </FlexWindow>
        </FullWindow>
      )
    } else if (loadUserStatus === RequestState.REQUESTING) {
      return (
        <FullWindow flex="column">
          <Header />
          <FlexWindow className="spinner spinner--dark" />
        </FullWindow>
      )
    } else {
      return (
        <FullWindow>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/login" />
          </Switch>
        </FullWindow>
      )
    }
  }
}

const connected = withRouter(
  connect<StateProps, {}, {}, State>(
    state => ({
      user: selectUser(state),
      loadUserStatus: selectLoadUserStatus(state),
    }),
    {}
  )(App)
)
export { connected as App }
