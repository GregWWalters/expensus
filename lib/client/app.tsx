import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import '../css/index.scss'
import State from '../types/state'
import UserState from '../types/state/user'
import Login from './components/login/login'
import { selectMaybeUser } from './state/selectors/user'

interface StateProps {
  user: UserState | null
}

class App extends React.Component<StateProps> {
  render() {
    const { user } = this.props
    return user ? <div>Authed</div> : this.renderLoginSignup()
  }

  renderLoginSignup() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/signup" component={Signup} /> */}
        <Redirect to="/login" />
      </Switch>
    )
  }

  // renderAuthedApp() {}
}

const connected = connect<StateProps, {}, {}, State>(
  state => ({
    user: selectMaybeUser(state),
  }),
  {}
)(App)

export { connected as App }
