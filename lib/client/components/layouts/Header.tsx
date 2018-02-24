import React from 'react'
import {
  withRouter,
  Link,
  NavLink,
  RouteComponentProps,
} from 'react-router-dom'

const Header: React.SFC<RouteComponentProps<{}>> = ({ match }) => {
  return (
    <div className="header">
      <div className="header__title">
        <Link to="/home">Expensus</Link>
      </div>
      <div className="header__nav-container">
        <NavLink className="header__nav-item" to="/group">
          Group
        </NavLink>
        <NavLink className="header__nav-item" to="/user">
          User
        </NavLink>
        <NavLink className="header__nav-item" to="/notifications">
          Notifications
        </NavLink>
        <NavLink className="header__nav-item" to="/logout">
          Logout
        </NavLink>
      </div>
    </div>
  )
}

const routed = withRouter(Header)
export { routed as Header }
