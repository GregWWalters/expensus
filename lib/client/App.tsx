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
import State from '../types/state'
import { UserForClient } from '../types/state/user'
import { Login } from './components/auth/Login'
import { Signup } from './components/auth/Signup'
import { Dashboard } from './components/dashboard/Dashboard'
import { Header } from './components/layouts/Header'
import { selectUser } from './state/selectors/userState'

interface StateProps {
  user: UserForClient | null
}

type Props = StateProps & RouteComponentProps<{}>

class App extends React.Component<Props> {
  render() {
    const { user } = this.props
    if (user) {
      return (
        <div>
          <Header />
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/group" render={() => <div>Groups</div>} />
            <Route path="/user" render={() => <div>User</div>} />
            <Redirect to="/dashboard" />
          </Switch>
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
    }),
    {}
  )(App)
)
export { connected as App }
