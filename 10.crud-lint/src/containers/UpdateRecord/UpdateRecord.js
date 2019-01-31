import React, { Component } from 'react';
import './UpdateRecord.css';
import PropTypes from 'prop-types';

import {
  setUserRecord,
  getSingleRecord,
  updateUserRecord,
} from '../../apiCalls/apiCalls';

class UpdateRecord extends Component {

  constructor(props) {

    super(props);
    this.state = {
      firstname: '',
      avatar: '',
      job: '',
      loading: null,
      error: false,
      displayButton: 'Submit',
      newUser: props.match.params.id === 'new',
    };

  }

  componentDidMount() {

    this.setState({ loading: true });
    console.log('[UpdateRecord][Didmount]');
    this.updateForms();

  }

  componentDidUpdate(prevProps) {

    if (prevProps !== this.props) {

      // path are changed so do the props.
      // console.log('[UpdateRecord] Different Props',prevProps,this.props)
      this.updateForms();
      this.setState({ firstname: '', job: '', avatar: '' });

    }

  }

  updateForms = () => {

    if (this.props.match.params.id === 'new') {

      this.setState({ newUser: true, loading: false });

    }
    else if (!isNaN(this.props.match.params.id)) {

      this.setState({ newUser: false });
      this.getRecord();

    }
    else {

      this.props.history.push('/invalid');

    }

  }

  getRecord = () => {

    getSingleRecord(this.props.match.params.id)
      .then(res => {

        if (res.success) {

          console.log('[UpdateRecord][EditRecord] Single Data Fetched.');
          this.setState({
            firstname: res.data.first_name,
            job: res.data.last_name,
            avatar: res.data.avatar,
            loading: false,
          });

        }
        else {

          console.log('[UpdateRecord][EditRecord]', res.error);
          this.setState({ error: true, loading: false });

        }

      });

  }

  editRecord = (e) => {

    e.preventDefault();
    updateUserRecord(
      this.state.firstname,
      this.state.last_name,
      this.props.match.params.id)
      .then(res => {

        if (res.success) {

          console.log('[UpdateRecord][EditUser] Completed.');
          this.setState({ error: false, loading: false });
          this.props.history.push('/list');

        }
        else {

          console.log('[UpdateRecord][EditUser] Error.', res.error);
          this.setState({ error: true, loading: false });

        }

      });

  }

  addRecord = (e) => {

    e.preventDefault();
    this.setState({ displayButton: 'Please wait...' });
    if (this.state.firstname === '' || this.state.job === '') {

      this.setState({ displayButton: 'Submit', loading: false });
      console.log('[UpdateRecord] Empty Form');

    }

    setUserRecord(this.state.firstname, this.state.job).then(res => {

      if (res.success === true) {

        this.setState(
          {
            error: false,
            loading: false,
            displayButton: 'Submit',
          });
        console.log('[UpdateRecord][NewRecord] Data Submitted.');
        this.props.history.push('/list');

      }
      else {

        console.log('[UpdateRecord][NewRecord] Error in data submission.',
          res.error);
        this.setState(
          {
            error: true,
            loading: false,
            displayButton: 'Error! Try again.',
          });

      }

    });

  }

  render() {

    let {
      firstname,
      job,
      avatar,
      displayButton,
      newUser,
      error,
      loading,
    } = this.state;

    return (
      <div className='add-record'>
        <p className='heading'>{newUser ? 'Add User' : 'Edit User'}</p>
        {loading
          ? <p className='message'>Please wait...</p>
          : !newUser && error ?
            <p className='message'>
              Error Occurred! <br /> Please try after some time.
            </p>
            :
            <form
              className='addUserForm'
              onSubmit={(e) => newUser ? this.addRecord(e) : this.editRecord(e)}
              name='addUserForm'>
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
              <button name='submit' type='submit'>{displayButton}</button>
              <button onClick={
                () => this.props.history.push('/list')
              }>Cancel</button>
            </form>
        }
      </div>
    );

  }

}

UpdateRecord.propTypes = {

  history: PropTypes.object,
  match: PropTypes.object,

};

export default UpdateRecord;