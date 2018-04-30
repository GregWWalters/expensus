import React from 'react'
import { withRouter, NavLink, RouteComponentProps } from 'react-router-dom'

const DashboardNav: React.SFC<RouteComponentProps<{}>> = ({ match }) => {
  return (
    <div className="dashboard-nav">
      <NavLink
        className="dashboard-nav__nav-item"
        activeClassName="dashboard-nav__nav-item--active"
        to={`${match.url}/home`}>
        Home
      </NavLink>
      <NavLink
        className="dashboard-nav__nav-item"
        activeClassName="dashboard-nav__nav-item--active"
        to={`${match.url}/transactions`}>
        Transactions
      </NavLink>
      {/* <NavLink
        className="dashboard-nav__nav-item"
        activeClassName="dashboard-nav__nav-item--active"
        to={`${match.url}/analysis`}>
        Analysis
      </NavLink> */}
    </div>
  )
}

const routed = withRouter(DashboardNav)
export { routed as DashboardNav }
