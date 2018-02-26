import React from 'react'
import { withRouter, NavLink, RouteComponentProps } from 'react-router-dom'

const GroupNav: React.SFC<RouteComponentProps<{}>> = ({ match }) => {
  return (
    <div className="group-nav">
      <NavLink
        className="group-nav__nav-item"
        activeClassName="group-nav__nav-item--active"
        to={`${match.url}/info`}>
        Group Info
      </NavLink>
      <NavLink
        className="group-nav__nav-item"
        activeClassName="group-nav__nav-item--active"
        to={`${match.url}/accounts`}>
        Accounts
      </NavLink>
      <NavLink
        className="group-nav__nav-item"
        activeClassName="group-nav__nav-item--active"
        to={`${match.url}/buckets`}>
        Accounts
      </NavLink>
    </div>
  )
}

const routed = withRouter(GroupNav)
export { routed as GroupNav }
