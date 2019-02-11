import React, { Component } from 'react';
import { Button, CustomInput, Form, Col, Row, FormGroup, Label, Input, Container } from 'reactstrap';
import { cloneDeep } from 'lodash';

import InputElement from '../../components/InputElement/InputElement';
import Password from '../../components/Password/Password';
import './Register.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      mobileno: '',
      address: '',
      gender: '',
      city: [],
      valid: {
        username: null,
        email: null,
        password: null,
        mobileno: null,
        gender: null,
        checkbox: null,
        address: null,
      },
    }
    this.cityNames = ['Ahmedabad', 'Rajkot', 'Surat'];
    this.radioFields = ['Male', 'Female'];
    this.baseState = cloneDeep(this.state);
  }

  formReset = () => {
    let tempCopyState = cloneDeep(this.state);
    this.setState({ ...this.baseState, registered: tempCopyState, reset: true }); //reset form
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

    for (let val in currState.valid) {
      if (!currState.valid[val]) {
        failed = true;
        this.validationHandler(val, false);
      }
    }
    //new method 
    if (failed) {
      console.log('Failed', currState);
    }
    else {
      console.log('Success', currState);
      this.formReset();
    }
  }
  handleRadioChange = e => {
    this.setState({
      gender: e.target.id
    });
    this.validationHandler('gender', true);
  }

  handleCheckbox = e => {
    let tempcity = this.state.city;
    let validate;
    tempcity.includes(e.target.id) ? tempcity.splice(tempcity.indexOf(e.target.id), 1) : tempcity.push(e.target.id);
    this.setState(
      { city: tempcity }
    );
    this.state.city.length > 0 ? validate = true : validate = false;
    this.validationHandler('checkbox', validate)
  }

  validationHandler = (key, value) => {
    let valid = this.state.valid;
    valid[key] = value;
    this.setState({ valid: valid });
  }

  changeHandler = (key, value) => {
    this.setState({ [key]: value });
  }

  componentDidUpdate(prevPros) {
    this.state.reset && this.setState({ reset: false });
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
                validationFunc={(value) => { this.validationHandler('username', value); }}
                changeFunc={(value) => { this.changeHandler('username', value); }} />

              <InputElement
                type="email"
                name="email"
                placeholder="john@bacancy.com"
                valid={this.state.valid['email']}
                value={this.state.email}
                description="Enter Email"
                validationFunc={(value) => { this.validationHandler('email', value) }}
                changeFunc={(value) => { this.changeHandler('email', value); }} />



              <Password
                value={this.state['password']}
                validVal={this.state.valid['password']}
                reset={this.state.reset}
                validationFunc={(value) => { this.validationHandler('password', value) }}
                changeFunc={(value) => { this.changeHandler('password', value); }}
              />

              {/* <InputElement
                    type="password"
                    name="password"
                    placeholder="Password"
                    valid={this.state.valid['password']}
                    value={this.state.password}
                    description="Enter Password"
                    validationFunc={(value) => { this.validationHandler('password', value) }}
                    changeFunc={(value) => { this.changeHandler('password', value); }} />
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
                    changeFunc={(value) => { this.changeHandler('confirm', value); }} />
                */ }

              <InputElement
                type="text"
                name="mobile"
                placeholder="ex. 999..."
                maxLength={10}
                valid={this.state.valid['mobileno']}
                value={this.state.mobileno}
                description="Enter Mobile No."
                validationFunc={(value) => { this.validationHandler('mobileno', value) }}
                changeFunc={(value) => { this.changeHandler('mobileno', value); }} />

              <FormGroup>
                <Label for="gender">Gender</Label>
                <div>
                  {
                    this.radioFields.map((value, index) => {
                      return (
                        <CustomInput
                          id={value}
                          key={index}
                          type="radio"
                          invalid={!this.state.valid['gender'] && this.state.valid['gender'] !== null}
                          label={value}
                          checked={this.state.gender === value}
                          inline
                          onChange={this.handleRadioChange} />
                      )
                    })
                  }
                </div>
              </FormGroup>

              <FormGroup>
                <Label for="city">Select your city</Label>
                <div>
                  {//new checkbox component with label
                    this.cityNames.map((value, index) => {
                      return (
                        <CustomInput
                          id={value}
                          key={index}
                          label={value}
                          type="checkbox"
                          invalid={!this.state.valid['checkbox'] && this.state.valid['checkbox'] !== null}
                          checked={this.state.city.includes(value)}
                          inline
                          onChange={this.handleCheckbox} />
                      )
                    })
                  }
                </div>
              </FormGroup>

              <FormGroup>
                <Label for='address'>Enter your Address</Label>
                <Input type="textarea"
                  name="address"
                  value={this.state.address}
                  className={this.state.valid.address !== null ? (!this.state.valid.address ? 'is-invalid' : 'is-valid') : null}
                  rows='3'
                  placeholder="1207, Times Square, Thaltej, Ahmedabad."
                  onChange={(e) => { this.setState({ address: e.target.value }); this.validationHandler('address', this.state.address !== '' ? true : false) }} />
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