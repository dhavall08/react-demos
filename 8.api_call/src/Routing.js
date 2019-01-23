import React, { Component } from 'react';
import { Switch, BrowserRouter, Route, Redirect, NavLink } from 'react-router-dom';
import RecordList from './containers/RecordList/RecordList';
import NewRecord from './containers/RecordList/NewRecord';

class Routing extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{
          margin: 'auto',
          width: '900px',
        }}>
          <p>User CRUD Application</p><br />
          <NavLink exact to='/list' activeClassName="active">Record List</NavLink> |
                    <NavLink to='/list/new' activeClassName="active"> Add Record</NavLink>
          <br />
          <br />
          <Switch>
            <Route exact path='/'>
              <Redirect to='/list' />
            </Route>
            <Route exact path="/list" component={RecordList} />
            <Route exact path="/list/new" component={NewRecord} />
            <Route component={() => <p>404! Page not found!</p>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routing;
