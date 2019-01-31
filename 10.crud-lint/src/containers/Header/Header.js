import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Header extends Component {

  render() {

    return (
      <div
        className='header-div'>
        <p
          className="heading">
          User CRUD Application
        </p>
        <div className="header-names">
          <NavLink
            exact to='/list'
            className='header-name'
            activeClassName="active">
            Record List
          </NavLink>
          <span>|</span>
          <NavLink
            to='/list/new'
            className='header-name'
            activeClassName="active"> Add Record
          </NavLink>
        </div>
      </div>
    );

  }

}

export default Header;