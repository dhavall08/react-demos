import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './containers/Register/Register';
import PageNotFound from './containers/PageNotFound/PageNotFound';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route component={Register} exact path='/' />
            <Route component={PageNotFound} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
