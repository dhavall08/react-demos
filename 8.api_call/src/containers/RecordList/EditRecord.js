import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import './NewRecord.css';
import axios from 'axios';

class EditRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            isSubmitted: false,
            loading: true
        }
    }

    componentDidMount() {
        this.getRecord();
        this.setState({ loading: false });
    }
    getRecord = () => {
        let url = 'https://reqres.in/api/users/' + this.props.id;
        axios.get(url)
            .then(res => {
                this.setState({ user: res.data.data }, function () {
                    if (res.status === 200)
                        console.log('[Edit Record] Single Data Fethced.', res.data.data)
                });
            }).catch(function (error) {
                console.log(error);
            });
    }
    render() {
        // console.log("id", this.props.match.params.id)
        if (this.state.isSubmitted === true) {

            return <Redirect to='/list' />
        }
        else if (this.state.loading === true) {
            return <p>Loading...</p>
        }
        else {
            return (
                <>
                    <strong><p>Edit User</p></strong>
                    <br />
                    <form className='addUserForm' onSubmit={this.editRecord} name='addUserForm'>
                        <div className='field'>
                            <label>Name:</label><br />
                            <input onChange={e => this.setState({ firstname: e.target.value })} type='text' value={this.state.user.first_name} placeholder='Enter First name' /><br />
                        </div>
                        <div className='field'>
                            <label>Job:</label><br />
                            <input onChange={e => this.setState({ job: e.target.value })} value={this.state.user.last_name} type='text' placeholder='Enter Job' /><br />
                        </div>
                        <div className='field'>
                            <label>Avatar:</label><br />
                            <img src={this.state.user.avatar} /><br />
                        </div>
                        <button type='submit'>Submit</button>
                        <NavLink to='/list'><button>Cancel</button></NavLink>
                    </form>
                </>
            );
        }
    }
}

export default EditRecord;