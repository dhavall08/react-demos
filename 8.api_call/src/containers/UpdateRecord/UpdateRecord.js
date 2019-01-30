import React, { Component } from 'react';
import './UpdateRecord.css';
import { setUserRecord, getSingleRecord, updateUserRecord } from '../../apiCalls/apiCalls';

class UpdateRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      avatar: '',
      job: '',
      isSubmitted: false,
      loading: true,
      error: false,
      buttonValue: 'Submit',
      newUser: props.match.params.id === 'new'
    }
  }

  componentDidMount() {
    console.log('[UpdateRecord][Didmount]');
    this.updateForms();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      //path are changed so do the props.
      //console.log('[UpdateRecord] Different Props',prevProps,this.props)
      this.updateForms();
      this.setState({ firstname: '', job: '', avatar: '' });
    }
  }

  updateForms = () => {
    if (this.props.match.params.id === 'new') { this.setState({ newUser: true }); }

    else if (!isNaN(this.props.match.params.id)) {
      this.getRecord();
      this.setState({ newUser: false, loading: false });
    }
    else { this.props.history.push('/invalid'); }
  }

  getRecord = () => {
    getSingleRecord(this.props.match.params.id)
      .then(res => {
        if (res.success) {
          console.log('[UpdateRecord][EditRecord] Single Data Fethced.');
          this.setState({ firstname: res.data.first_name, job: res.data.last_name, avatar: res.data.avatar });
        }
        else {
          console.log('[UpdateRecord][EditRecord]', res.error);
        }
      });
  }

  editRecord = (e) => {
    e.preventDefault();
    updateUserRecord(this.state.firstname, this.state.last_name, this.props.match.params.id).then(res => {
      if (res.success) {
        console.log('[UpdateRecord][EditUser] Completed.');
        this.props.history.push('/list');
      }
      else {
        console.log('[UpdateRecord][EditUser] Error.', res.error);
      }
    });
  }

  addRecord = (e) => {
    e.preventDefault();
    this.setState({ buttonValue: 'Please wait...', loading: true });
    if (this.state.firstname === '' || this.state.job === '') {
      this.setState({ buttonValue: 'Submit', loading: true });
      alert('Empty form.');
      return false;
    }

    setUserRecord(this.state.firstname, this.state.job).then(res => {
      if (res.success === true) {
        this.setState({ isSubmitted: true, error: false, loading: false, buttonValue: 'Submit' });
        console.log('[UpdateRecord][NewRecord] Data Submitted.');
        alert("Data Submitted");
        this.props.history.push('/list');
      }
      else {
        console.log('[UpdateRecord][NewRecord] Data Submitted.', res.error);
        this.setState({ error: true, loading: false, buttonValue: 'Error! Try again.' });
      }
    })
  }

  render() {
    let { firstname, job, avatar, buttonValue, newUser } = this.state;
    return (
      <div className='add-record'>
        <p className='heading'>{newUser ? 'Add User' : 'Edit User'}</p>
        {
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
        }
      </div>
    );
  }
}

export default UpdateRecord;