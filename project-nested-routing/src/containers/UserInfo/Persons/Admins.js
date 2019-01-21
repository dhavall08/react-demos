import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import './persons.css';

class steve extends Component {
    state={image:''}
    render() {
        return (<div>
            <img src={this.state.image} />
            <p>Steve Jobs<br />Age: 16</p>
        </div>)
    }
    componentWillMount(){
        fetch('https://randomuser.me/api/').then(res => res.json()).then(res => {
            this.setState({name:res.results[0].name.first,image:res.results[0].picture.medium});
        });
    }
}

class jamse extends Component {
    state={image:''}
    render() {
        return (<div>
            <img src={this.state.image} />
            <p>Jamsetji Tata<br />Age: 30</p>
        </div>)
    }
    componentWillMount(){
        fetch('https://randomuser.me/api/').then(res => res.json()).then(res => {
            this.setState({name:res.results[0].name.first,image:res.results[0].picture.medium});
        });
    }
}

class cadbury extends Component {
    state={image:''}
    render() {
        return (<div>
            <img src={this.state.image} />
            <p>John Cadbury<br />Age: 22</p>
        </div>)
    }
    componentWillMount(){
        fetch('https://randomuser.me/api/').then(res => res.json()).then(res => {
            this.setState({name:res.results[0].name.first,image:res.results[0].picture.medium});
        });
    }
}

class Admins extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className='profile-container'>
                    <ul style={{ float: 'left' }}>
                        <li><NavLink to='/profile/1'>Steve Jobs</NavLink></li>
                        <li><NavLink to='/profile/2'>Jamsetji Tata</NavLink></li>
                        <li><NavLink to='/profile/3'>John Cadbury</NavLink></li>
                    </ul>
                    <div style={{ float: 'right', padding: '20px', marginRight: '100px' }}>
                        <Switch>
                            <Route path='/profile/1' component={steve} />
                            <Route path='/profile/2' component={jamse} />
                            <Route path='/profile/3' component={cadbury} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Admins;