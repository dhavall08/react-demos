import React, { Component } from 'react';
import './NewRecord.css';
import { apiAddRecord, apiSingleRecord, apiEditRecord } from '../../api/api';

class NewRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            job: '',
            isSubmitted: false,
            loading: true,
            error: false,
            buttonValue: 'Submit',
            newUser: props.match.params.id === 'new'
        }
    }

    componentDidMount() {
        console.log('did mount')
        if (this.props.match.params.id === 'new')
            this.setState({ newUser: true });

        else if (!isNaN(this.props.match.params.id)) {
            this.getSingleRecord();
            this.setState({ newUser: false, loading: false });
        }
        else
            this.props.history.push('/invalid')
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
        }
    }

    getSingleRecord = () => {
        let res = apiSingleRecord(this.props.match.params.id,(res)=> {
            if (res.success) {
                this.setState({ firstname: res.first_name, job: res.last_name, avatar: res.avatar },
                    function () {
                        console.log('[NewRecord] Single Data Fethced.', res)
                    });
            }
            else {
                console.log("[NewRecord] Error fetching single record", res.error);
            }
        })
    }

    editRecord = (e) => {
        e.preventDefault();
        let res = apiEditRecord(this.state.user.firstname, this.state.user.last_name, this.props.id);
        if (res.success) {
            alert('Edited Record');
            this.props.history.push('/list');
        }
        else {
            alert(res.error);
        }
    }

    addRecord = (e) => {
        e.preventDefault();

        this.setState({ buttonValue: 'Please wait...', loading: true });

        if (this.state.firstname === '' || this.state.job === '') {
            this.setState({ buttonValue: 'Submit', loading: true });
            alert('Empty form.')
            return false;
        }

        let res = apiAddRecord(this.state.firstname, this.state.job)

        if (res.success === true) {
            this.setState({ isSubmitted: true, error: false, loading: false, buttonValue: 'Submit' });
            console.log('[New Record - new] Data Submitted.', res);
            alert("Data Submitted");
            this.props.history.push('/list');
        }
        else {
            this.setState({ error: true, loading: false, buttonValue: 'Error! Try again.' });
        }
    }

    render() {
        let { firstname, job, avatar, buttonValue, newUser } = this.state;
        
        return (
            <div className='add-record'>
                <p className='heading'>{newUser ? 'Add User' : 'Edit User'}</p>

                <form className='addUserForm' onSubmit={(e) => newUser ? this.addRecord(e) : this.editRecord(e)} name='addUserForm'>
                    <div className='field'>
                        <label>Name:</label><br />
                        <input
                            onChange={e => this.setState({ firstname: e.target.value })}
                            value={firstname}
                            type='text'
                            placeholder='Enter First name' /><br />
                    </div>
                    <div>
                        <label>Job:</label><br />
                        <input
                            onChange={e => this.setState({ job: e.target.value })}
                            value={job}
                            type='text'
                            placeholder='Enter Job' /><br />
                    </div>
                    {
                        newUser ||
                        <div className='field'>
                            <label>Avatar:</label><br />
                            <img
                                src={avatar}
                                alt={firstname} /><br />
                        </div>
                    }
                    <button name='submit' type='submit'>{buttonValue}</button>
                    <button onClick={() => this.props.history.push('/list')}>Cancel</button>
                </form>
            </div>
        );
    }
}

export default NewRecord;