import React from 'react'
import { connect } from 'react-redux'
import {
  withRouter,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom'
import '../css/index.scss'
import { FetchStatus } from '../types'
import State from '../types/state'
import { UserForClient } from '../types/state/user'
import { Login } from './components/auth/Login'
import { Signup } from './components/auth/Signup'
import { Dashboard } from './components/dashboard/Dashboard'
import { Header } from './components/layouts/Header'
import { selectUser, selectUserStatus } from './state/selectors/userState'

interface StateProps {
  user: UserForClient | null
  userStatus: FetchStatus
}

type Props = StateProps & RouteComponentProps<{}>

class App extends React.Component<Props> {
  render() {
    const { user, userStatus } = this.props
    if (user) {
      return (
        <div className="h100">
          <Header />
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/group" render={() => <div>Groups</div>} />
            <Route path="/user" render={() => <div>User</div>} />
            <Redirect to="/dashboard" />
          </Switch>
        </div>
      )
    } else if (userStatus === 'loading') {
      return (
        <div className="h100 flex-col">
          <Header />
          <div className="spinner flex-1" />
        </div>
      )
    } else {
      return (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Redirect to="/login" />
        </Switch>
      )
    }
  }
}

const connected = withRouter(
  connect<StateProps, {}, {}, State>(
    state => ({
      user: selectUser(state),
      userStatus: selectUserStatus(state),
    }),
    {}
  )(App)
)
export { connected as App }
