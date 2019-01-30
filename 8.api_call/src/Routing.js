import React, { Component } from 'react';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import NewRecord from './containers/NewRecord/NewRecord';
import RecordList from './containers/RecordList/RecordList';
import Header from './containers/Header/Header'
import PageNotFound from './containers/PageNotFound/PageNotFound';

class Routing extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
         <Header />
          <Switch>
            <Route exact path='/'>
              <Redirect to='/list' />
            </Route>
            <Route exact path="/list/" component={RecordList} />
            <Route exact path="/list/:id" component={NewRecord} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routing;
