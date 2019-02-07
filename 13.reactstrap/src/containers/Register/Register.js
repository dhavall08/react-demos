import React, { Component } from 'react';
import { Button, CustomInput, Form, Col, Row, FormGroup, Label, Input, Container } from 'reactstrap';
import { cloneDeep } from 'lodash';

import InputElement from '../../components/InputElement/InputElement';
import './Register.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      confirm: '',
      mobileno: '',
      address: '',
      gender: 'male',
      city: {
        Rajkot: false,
        Ahmedabad: false,
        Surat: false,
      },
      valid: {
        username: null,
        email: null,
        password: null,
        confirm: null,
        mobileno: null,
      },
    }

    this.baseState = cloneDeep(this.state);
  }

  handleEditBtn = () => {
    !this.state.registered
      ? console.log('First register user and then try edit button.')
      : this.setState({ ...this.state.registered });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let currState = this.state;
    let failed;

    this.validationHander('confirm', currState.password !== '' && currState.password === currState.confirm ? true : false);
    for (let val in currState.valid) {
      if (!currState.valid[val]) {
        failed = true;
        this.validationHander(val, false);
      }
    }
    if (failed) {
      console.log('Failed', currState);
    }
    else {
      console.log('Success', currState);
      let tempCopyState = cloneDeep(this.state);
      this.setState({ ...this.baseState, registered: tempCopyState }); //reset form
    }
  }
  handleRadioChange = e => {
    this.setState({
      gender: e.target.id
    });
  }

  handleCheckbox = e => {
    let obj = this.state.city;
    obj[e.target.id] = e.target.checked;
    this.setState(
      { city: obj }
    );
  }

  validationHander = (key, value) => {
    let valid = this.state.valid;
    valid[key] = value;
    this.setState({ valid: valid });
  }

  changeHandler = (key, value) => {
    this.setState({ [key]: value });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Form className='form'>
              <p className="heading">Registration Form</p>
              <InputElement
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                valid={this.state.valid['username']}
                description="Enter Username"
                validationEvent={(value) => { this.validationHander('username', value); }}
                changeEvent={(value) => { this.changeHandler('username', value); }} />

              <InputElement
                type="email"
                name="email"
                placeholder="john@bacancy.com"
                valid={this.state.valid['email']}
                value={this.state.email}
                description="Enter Email"
                validationEvent={(value) => { this.validationHander('email', value) }}
                changeEvent={(value) => { this.changeHandler('email', value); }} />

              <Row>
                <Col md={{ size: 6 }}>
                  <InputElement
                    type="password"
                    name="password"
                    placeholder="Password"
                    valid={this.state.valid['password']}
                    value={this.state.password}
                    description="Enter Password"
                    validationEvent={(value) => { this.validationHander('password', value) }}
                    changeEvent={(value) => { this.changeHandler('password', value); }} />
                </Col>
                <Col md={{ size: 6 }}>
                  <InputElement
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm"
                    valid={this.state.valid['confirm']}
                    value={this.state.confirm}
                    enteredPass={this.state.password}
                    description="Confirm Password"
                    changeEvent={(value) => { this.changeHandler('confirm', value); }} />
                </Col>
              </Row>

              <InputElement
                type="text"
                name="mobile"
                placeholder="ex. 999..."
                valid={this.state.valid['mobileno']}
                value={this.state.mobileno}
                description="Enter Mobile No."
                validationEvent={(value) => { this.validationHander('mobileno', value) }}
                changeEvent={(value) => { this.changeHandler('mobileno', value); }} />

              <FormGroup>
                <div>
                  <Label for="gender">Gender</Label>
                  <CustomInput
                    type="radio"
                    id="male"
                    name="gender"
                    label="Male"
                    checked={this.state.gender === 'male'}
                    onChange={this.handleRadioChange}
                  />
                  <CustomInput
                    type="radio"
                    id="female"
                    name="gender"
                    label="Female"
                    checked={this.state.gender === 'female'}
                    onChange={this.handleRadioChange} />
                </div>
              </FormGroup>

              <FormGroup>
                <Label for="city">Select your city</Label>
                <div>
                  <CustomInput
                    type="checkbox"
                    id="Ahmedabad"
                    label="Ahmedabad"
                    inline
                    checked={this.state.city['Ahmedabad']}
                    onChange={this.handleCheckbox} />
                  <CustomInput
                    type="checkbox"
                    id="Surat"
                    label="Surat"
                    inline
                    checked={this.state.city['Surat']}
                    onChange={this.handleCheckbox} />
                  <CustomInput
                    type="checkbox"
                    id="Rajkot"
                    label="Rajkot"
                    inline
                    checked={this.state.city['Rajkot']}
                    onChange={this.handleCheckbox} />
                </div>
              </FormGroup>

              <FormGroup>
                <Label for='address'>Enter your Address</Label>
                <Input type="textarea"
                  name="address"
                  value={this.state.address}
                  rows='3'
                  placeholder="1207, Times Square, Thaltej, Ahmedabad."
                  onChange={(e) => this.setState({ address: e.target.value })} />
              </FormGroup>

              <Row>
                <Col md='6'>
                  <Button
                    onClick={this.handleEditBtn}
                    block>
                    Edit
                  </Button>
                </Col>
                <Col md='6'>
                  <Button
                    color='primary'
                    onClick={this.handleSubmit}
                    block>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;