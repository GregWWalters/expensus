import React from 'react'
import { connect } from 'react-redux'
import {
  withRouter,
  Link,
  NavLink,
  RouteComponentProps,
} from 'react-router-dom'
import { Dispatch } from 'redux'
import State from '../../../types/state'
import { triggerLogout } from '../../actions/AuthActions'

interface DispatchProps {
  logout: () => void
}

type Props = DispatchProps & RouteComponentProps<{}>

const Header: React.SFC<Props> = ({ match, logout }) => {
  return (
    <div className="header">
      <div className="header__title">
        <Link to="/home">Expensus</Link>
      </div>
      <div className="header__nav-container">
        <NavLink className="header__nav-item" to="/group">
          Group
        </NavLink>
        {/* <NavLink className="header__nav-item" to="/user">
          User
        </NavLink>
        <NavLink className="header__nav-item" to="/notifications">
          Notifications
        </NavLink> */}
        <a onClick={logout} className="header__nav-item">
          Logout
        </a>
      </div>
    </div>
  )
}

const connected = withRouter(
  connect<{}, DispatchProps, {}, State>(null, (dispatch: Dispatch<State>) => ({
    logout: () => dispatch(triggerLogout()),
  }))(Header)
)
export { connected as Header }
