import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './containers/Register/Register';
import PageNotFound from './containers/PageNotFound/PageNotFound';
import MultipleComponent from './containers/MultipleComponent/MultipleComponent';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route component={Register} exact path='/' />
            <Route component={MultipleComponent} exact path='/new/' />
            <Route component={PageNotFound} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
