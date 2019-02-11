import React, { Component } from 'react';
import { Button, Form, Col, Row, FormGroup, Label, Input, Container } from 'reactstrap';
import { cloneDeep } from 'lodash';

import InputElement from '../../components/InputElement/InputElement';
import Password from '../../components/Password/Password';
import './Register.css';
import Checkbox from '../../components/Checkbox/Checkbox';
import RadioButton from '../../components/RadioButton/RadioButton';

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
    this.hobbies = [{name:'Swimming',value:'0'},{name:'Reading',value:'1'}]
    this.radioFields = ['Male', 'Female'];
    this.baseState = cloneDeep(this.state);
  }

  editClickHandler = () => {
    !this.state.registered
      ? console.log('First register user and then try edit button.')
      : this.setState({ ...this.state.registered });
  }

  handleSubmit = (currState) => {
    let failed;
    for (let val in currState.valid) {
      if (!currState.valid[val]) {
        failed = true;
        this.validationHandler(val, false);//remove
      }
    }
    if (failed) {
      return false;
    }
    else {
      return cloneDeep(currState);
    }
  }

  submitClickHandler = (e) => {
    e.preventDefault();
    let obj = this.handleSubmit(this.state);
    obj
      ? this.setState({ ...this.baseState, registered: obj, reset: true })
      : console.log('Failed'); //reset form
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
                info="Username should starts with letter. ex. John_123"
                errMsg="Please enter valid username."
                regularEx="^([a-zA-Z]+[a-zA-Z0-9_]*)$"
                validSymbol={true}
                value={this.state.username}
                valid={this.state.valid['username']}
                validationFunc={(value) => { this.validationHandler('username', value); }}
                changeFunc={(value) => { this.changeHandler('username', value); }} />

              <InputElement
                type="email"
                name="email"
                placeholder="Email Address"
                info="ex. john@business.com"
                errMsg="Please enter valid email id."
                value={this.state.email}
                valid={this.state.valid['email']}
                validationFunc={(value) => { this.validationHandler('email', value) }}
                changeFunc={(value) => { this.changeHandler('email', value); }} />

              <Password
                info="Password should contain digit, letter and special character. Length should be between 6 to 16."
                value={this.state['password']}
                validVal={this.state.valid['password']}
                reset={this.state.reset}
                validationFunc={(value) => { this.validationHandler('password', value) }}
                changeFunc={(value) => { this.changeHandler('password', value); }} />

              <InputElement
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                info="Enter 10 digits mobile number."
                errMsg="Please enter valid mobile no."
                maxLength={10}
                value={this.state.mobileno}
                valid={this.state.valid['mobileno']}
                validationFunc={(value) => { this.validationHandler('mobileno', value) }}
                changeFunc={(value) => { this.changeHandler('mobileno', value); }} />

              <Checkbox
                type='checkbox'
                label='Select your city'
                dataSource={this.cityNames}
                dataValue='value'
                dataName='name'
                simpleArray={true}
                valid={this.state.valid['checkbox']}
                checked={this.state.city}
                inline={true}
                changeListener={this.handleCheckbox} />

              <RadioButton
                type='radio'
                label='Gender'
                dataSource={this.radioFields}
                dataValue='value'
                dataName='name'
                simpleArray={true}
                valid={this.state.valid['gender']}
                checked={this.state.gender}
                inline={true}
                changeListener={this.handleRadioChange} />

              <FormGroup>
                <Label for='address'>Enter your Address</Label>
                <Input type="textarea"
                  name="address"
                  value={this.state.address}
                  className={this.state.valid.address !== null ? (!this.state.valid.address ? 'is-invalid' : 'is-valid') : null}
                  rows='3'
                  placeholder="1207, Times Square, Thaltej, Ahmedabad."
                  onChange={(e) => { this.setState({ address: e.target.value }, () => { this.validationHandler('address', this.state.address !== '' ? true : false) }); }} />
              </FormGroup>

              <Row>
                <Col md='6'>
                  <Button
                    onClick={this.editClickHandler}
                    block>
                    Edit
                  </Button>
                </Col>
                <Col md='6'>
                  <Button
                    color='primary'
                    onClick={this.submitClickHandler}
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