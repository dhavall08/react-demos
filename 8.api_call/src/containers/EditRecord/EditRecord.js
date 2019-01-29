import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import './EditRecord.css';
import { apiEditRecord, apiSingleRecord } from '../../api/api';

class EditRecord extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                first_name: '',
                last_name: '',
            },
            isSubmitted: false,
            loading: true
        }
    }

    componentDidMount() {
        this.getRecord();
        this.setState({ loading: false });
    }
    getRecord = () => {
        apiSingleRecord(this.props.id)
            .then(res => {
                this.setState({ user: res.data.data }, function (res) {
                    if (res.status === 200)
                        console.log('[Edit Record] Single Data Fethced.', res.data.data)
                });
            }).catch(function (error) {
                console.log(error);
            });
    }

    editRecord = (e) => {
        e.preventDefault();
        apiEditRecord(this.state.user.firstname, this.state.user.last_name, this.props.id)
            .then(res => {
                this.setState({ isSubmitted: true }, function () {
                    if (res.status === 200)
                        console.log('[Edit Record] Data Updated.', res)
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
                <div className='edit-record'>
                    <p className='heading'>Edit User</p>
                    <form className='edit-form' onSubmit={this.editRecord} name='editUserForm'>
                        <div className='field'>
                            <label>Name:</label><br />
                            <input
                                onChange={e => this.setState({ user: { ...this.state.user, first_name: e.target.value } })}
                                type='text'
                                value={this.state.user.first_name}
                                placeholder='Enter First name' /><br />
                        </div>
                        <div className='field'>
                            <label>Job:</label><br />
                            <input
                                onChange={e => this.setState({ user: { ...this.state.user, last_name: e.target.value } })}
                                value={this.state.user.last_name}
                                type='text'
                                placeholder='Enter Job' /><br />
                        </div>
                        <div className='field'>
                            <label>Avatar:</label><br />
                            <img
                                src={this.state.user.avatar}
                                alt={this.state.user.first_name} /><br />
                        </div>
                        <button type='submit'>Submit</button>
                        <NavLink to='/list'><button>Cancel</button></NavLink>
                    </form>
                </div>
            );
        }
    }
}

export default EditRecord;