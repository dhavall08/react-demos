import React, { Component } from 'react';
import { Redirect , NavLink} from 'react-router-dom';
import './NewRecord.css';
import axios from 'axios';

class NewRecord extends Component {
    state = {
        firstname: '',
        job: '',
        isSubmitted: false,
        loading: false,
    }

    addRecord = (e) => {
        e.preventDefault();
        e.target.submit.value = 'Please wait...';
        this.setState({ loading: true });
        let url = 'https://reqres.in/api/users/';
        axios.post(url, {
            'name': this.state.firstname,
            'job': this.state.job
        })
            .then(res => {
                this.setState({ isSubmitted: true }, function () {
                    if (res.status === 201) {
                        console.log('Data Submitted.', res);
                        alert("Data Submitted");
                    }
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
                <form className='addUserForm' onSubmit={(e) => this.addRecord(e)} name='addUserForm'>
                    <div className='field'>
                        <label>Name:</label><br />
                        <input onChange={e => this.setState({ firstname: e.target.value })} type='text' value={this.state.firstname} placeholder='Enter First name' /><br />
                    </div>
                    <div>
                        <label>Job:</label><br />
                        <input onChange={e => this.setState({ job: e.target.value })} value={this.state.job} type='text' placeholder='Enter Job' /><br />
                    </div>
                    <button name='submit' type='submit'>Submit</button>
                    <NavLink to='/list'><button>Cancel</button></NavLink>
                </form>
            </>
        );
    }
}

export default NewRecord;