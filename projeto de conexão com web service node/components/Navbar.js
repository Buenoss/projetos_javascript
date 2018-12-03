import React, { Component } from 'react';
import { NavLink,withRouter } from 'react-router-dom'

class Navbar extends Component{
    render(){
        return (
            <nav className="nav-wrapper red darken-3">
                <ul className="left">
                    <li><NavLink exact to="/" >Iesb Ramais</NavLink></li>
                    <li><NavLink  to="/add" >Adicionar</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(Navbar);