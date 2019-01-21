import React, { Component } from 'react';
import './Header.css';
import { NavLink, Link } from 'react-router-dom';


class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="header">
                    <div className="logo">
                        <Link to='/home'>Colleges Information</Link>
                    </div>
                    <ul className="menu-list">
                        <li><NavLink to="/home" activeClassName="active">Home</NavLink></li>
                        <li><NavLink to="/college-info/" activeClassName="active" >College Information</NavLink></li>
                        <li><NavLink to="/profile-info/home" activeClassName="active">Profile Information</NavLink></li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default Header;