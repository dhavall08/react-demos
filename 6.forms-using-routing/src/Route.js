import React from 'react';
import App from './App'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Parent from './components/Parent';
import NotFound from './components/NotFound';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import ProfileName from './components/ProfileName';

const createRoutes = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/home" component={App} />
                <Route exact path="/SignUp" component={SignUpPage} />
                <Route exact path="/SignIn" component={SignInPage} />                
                <Route path="/ProfileName/:pid?" component={ProfileName} /> {/* '?' is for zero or 1. same component for without parameter.*/}
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default createRoutes;