import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/MainHeader/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Collegeinfo from './containers/CollegeInfo/CollegeInfo';
import Profileinfo from './containers/UserInfo/ProfileInfo';
import Home from './containers/Home/Home';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Header />
            <Switch>
                <Route component={Home} exact path="/" />
                <Route component={Home} exact path="/home" />
                <Route component={Collegeinfo} path="/college-info" />
                <Route component={Profileinfo} path="/profile-info" />
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    </BrowserRouter>
    ,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
