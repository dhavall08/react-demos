import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import List from './components/List/List';
import AddUser from './components/AddUser/AddUser';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <>
            <Route exact path='/' component={List} />
            <Route path='/add/:id?' component={AddUser} />
          </>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
