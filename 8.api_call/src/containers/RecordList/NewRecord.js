import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import './NewRecord.css';
import axios from 'axios';

class NewRecord extends Component {
    state = {
        firstname: '',
        job: '',
        isSubmitted: false
    }
    addRecord = (e) => {
        e.preventDefault();
        let url = 'https://reqres.in/api/users/';
        axios.post(url, {
            'name': this.state.firstname,
            'job': this.state.job
        })
            .then(res => {
                this.setState({ isSubmitted: true }, function() {
                    if (res.status === 201)
                        console.log('Data Submitted.', res)
                });
            }).catch(function (error) {
                console.log(error);
            });
    }
    render() {

        if (this.state.isSubmitted === true) {
            return <Redirect to='/list' />
        }
        return (
            <>
                <strong><p>Add User</p></strong>
                <br />
                <form className='addUserForm' onSubmit={this.addRecord} name='addUserForm'>
                    <div className='field'>
                        <label>Name:</label><br />
                        <input onChange={e => this.setState({ firstname: e.target.value })} type='text' value={this.state.firstname} placeholder='Enter First name' /><br />
                    </div>
                    <div>
                        <label>Job:</label><br />
                        <input onChange={e => this.setState({ job: e.target.value })} value={this.state.job} type='text' placeholder='Enter Job' /><br />
                    </div>
                    <button type='submit'>Submit</button>
                    <NavLink to='/list'><button>Cancel</button></NavLink>
                </form>
            </>
        );
    }
}

export default NewRecord;