import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <nav className="nav-wrapper red darken-3">
      <div className="container">
        <Link className="brand-logo left" to="/">Teste Iesb</Link>
        <ul className="right">
          <li><NavLink exact to="/">Home</NavLink></li>
        </ul>
      </div>
    </nav> 
  )
}

export default withRouter(Navbar)