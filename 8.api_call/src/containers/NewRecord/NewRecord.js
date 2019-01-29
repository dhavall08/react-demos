import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import './NewRecord.css';
import { apiAddRecord } from '../../api/api';

class NewRecord extends Component {
    state = {
        firstname: '',
        job: '',
        isSubmitted: false,
        loading: false,
        error: false,
        wait: 'Submit'
    }

    addRecord = (e) => {
        e.preventDefault();
        this.setState({ wait: 'Please wait...', loading: true });
        if (this.state.firstname === '' || this.state.job === '') {
            this.setState({ wait: 'Submit', loading: true });
            alert('Empty form.')
            return false;
        }
        apiAddRecord(this.state.firstname, this.state.job)
        .then(res => {

res ={
    success: true || false,
    data:null,
    error: null
}

            if(!res.success){
                this.setState({ error: true, loading: false, wait: 'Error! Try again.' });
                return false;
            }



            this.setState({ isSubmitted: true, error: false }, function () {
                if (res.status === 201) {
                    this.setState({ error: false, loading: false, wait: 'Submit' });
                    console.log('Data Submitted.', res);
                    alert("Data Submitted");
                    
                }


            });
        }).catch(function (error) {
            this.setState({ error: true, loading: false, wait: 'Error! Try again.' });
            console.log(error);
        });
    }

    render() {
        if (this.state.isSubmitted === true) {
            return <Redirect to='/list' />
        } // delete
        return (
            <div className='add-record'>
                <p className='heading'>Add User</p>

                <form className='addUserForm' onSubmit={(e) => this.addRecord(e)} name='addUserForm'>
                    <div className='field'>
                        <label>Name:</label><br />
                        <input onChange={e => this.setState({ firstname: e.target.value })} type='text' value={this.state.firstname} placeholder='Enter First name' /><br />
                    </div>
                    <div>
                        <label>Job:</label><br />
                        <input onChange={e => this.setState({ job: e.target.value })} value={this.state.job} type='text' placeholder='Enter Job' /><br />
                    </div>
                    <button name='submit' type='submit'>{this.state.wait}</button>
                    <NavLink to='/list'><button>Cancel</button></NavLink>
                </form>
            </div>
        );
    }
}

export default NewRecord;