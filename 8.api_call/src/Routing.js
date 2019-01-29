import React, { Component } from 'react';
import { Switch, BrowserRouter, Route, Redirect, NavLink } from 'react-router-dom';
import RecordList from './containers/RecordList/RecordList';
import './Routing.css';
class Routing extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='header-div'>
          <p className="heading">User CRUD Application</p>
          <div className="header-names"><NavLink exact to='/list' className='header-name' activeClassName="active">Record List</NavLink> <span>|</span>
            <NavLink to='/list/new' className='header-name' activeClassName="active"> Add Record</NavLink>
          </div>
          <Switch>
            <Route exact path='/'>
              <Redirect to='/list' />
            </Route>
            <Route exact path="/list/:id?" component={RecordList} />
            <Route component={() => <p>404! Page not found!</p>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routing;
