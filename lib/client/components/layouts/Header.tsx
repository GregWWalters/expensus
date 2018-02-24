import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.SFC = () => (
  <div className="header">
    <div className="header__title">
      <Link to="/home">Expensus</Link>
    </div>
    <div className="header__nav-container">
      <div className="header__nav-item">Manage Group</div>
      <div className="header__nav-item">User</div>
      <div className="header__nav-item">Notifications</div>
      <div className="header__nav-item">Logout</div>
    </div>
  </div>
)

export { Header }
