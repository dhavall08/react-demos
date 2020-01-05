import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AddUser.css';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        fname: '',
        lname: '',
        email: '',
        mobile: '',
        age: '',
      },
      updatingId: props.match && props.match.params.id
    }
  }

  onChangeHandler = (key, value) => {
    this.setState(prev => ({
      user: { ...prev.user, [key]: value }
    }));
  }

  componentDidMount() {
    if (this.state.updatingId) {
      axios.get('http://192.168.1.207:8080/api/students/find/' + this.state.updatingId).then(res => {
        if (res.data.data === null) {
          this.props.history.push('/add/');
          return
        }
        this.setState({ user: res.data.data });
      }).catch(error => console.log(error));
    }
  }

  submitHandler = () => {
    if (!this.state.updatingId) {
      axios.post('http://192.168.1.207:8080/api/students/create', this.state.user).then(res => {
        //console.log(res);
        if (res.status === 200) {
          this.props.history.push('/')
        }
      }).catch(error => console.log(error));
    }
    else {
      axios.put('http://192.168.1.207:8080/api/students/update/' + this.state.updatingId, this.state.user).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.props.history.push('/');
        }
      }).catch(error => console.log(error));
    }
  }

  render() {
    return (
      <div className='add-user-container'>
        <h3 className='heading-add'><Link className='back-btn' to='/'> {'👈'}</Link>{!this.state.updatingId ? 'Add User' : 'Edit User'}</h3>
        <input
          type='text'
          placeholder='First Name'
          value={this.state.user.fname}
          onChange={(e) => this.onChangeHandler('fname', e.target.value)} /><br />
        <input
          type='text'
          placeholder='Last Name'
          value={this.state.user.lname}
          onChange={(e) => this.onChangeHandler('lname', e.target.value)} /><br />
        <input
          type='text'
          placeholder='Email Address'
          value={this.state.user.email}
          onChange={(e) => this.onChangeHandler('email', e.target.value)} /><br />
        <input
          type='number'
          placeholder='Age'
          value={this.state.user.age}
          onChange={(e) => this.onChangeHandler('age', e.target.value)} /><br />
        <input
          type='text'
          placeholder='Mobile Number'
          maxLength='10'
          value={this.state.user.mobile}
          onChange={(e) => this.onChangeHandler('mobile', e.target.value)} /><br />
        <input
          type='submit'
          value={this.state.updatingId && 'Update'}
          onClick={this.submitHandler} />
        <br />
      </div>
    );
  }
}

export default AddUser;