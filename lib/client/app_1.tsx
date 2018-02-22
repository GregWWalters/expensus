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
import UserState from '../types/state/user'
import { Login } from './components/auth/Login'
import { Signup } from './components/auth/Signup'
import { selectMaybeUser } from './state/selectors/user'

interface StateProps {
  user: UserState | null
}

type Props = StateProps & RouteComponentProps<{}>

class App extends React.Component<Props> {
  render() {
    const { user } = this.props
    if (user) {
      return (
        <Switch>
          <Route
            path="/home"
            render={() => (
              <div>
                Welcome to Expensus!{' '}
                {this.props.user && this.props.user.firstName}
              </div>
            )}
          />
          <Redirect to="/home" />
        </Switch>
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
      user: selectMaybeUser(state),
    }),
    {}
  )(App)
)
export { connected as App }
