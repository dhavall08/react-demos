import React, { Component } from 'react';
import { Button, CustomInput, Form, Col, Row, FormGroup, Label, Input, Container } from 'reactstrap';
import InputElement from '../../components/InputElement/InputElement';
import './Register.css';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    mobileno: '',
    address: '',
    gender: 'male',
    city: {
      Rajkot: false,
      Ahmedabad: false,
      Surat: false,
    },
    valid: {
      username: false,
      email: false,
      password: false,
      mobileno: false,
    },
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let currState = this.state;
    for (let val in currState.valid) {
      if (!currState[val]) {
        console.log('Failed', currState);
        return;
      }
    }
    console.log('Success', currState);
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
  changeHandler = (key, value) => {
    let valid = this.state.valid;
    valid[key] = value[1];
    this.setState({ [key]: value[0], valid: valid });
    // this.setState(state=>{state[key]= value[0]
    //   state.valid[key]=value[1]
    // })

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
                placeholder="John_123"
                value={this.state.username}
                description="Enter Username"
                changeEvent={(value) => { this.changeHandler('username', value); }} />

              <InputElement
                type="email"
                name="email"
                placeholder="john@bacancy.com"
                value={this.state.email}
                description="Enter Email"
                changeEvent={(value) => { this.changeHandler('email', value); }} />


              <InputElement
                type="password"
                name="password"
                placeholder="*******"
                value={this.state.password}
                description="Enter Password"
                changeEvent={(value) => { this.changeHandler('password', value); }} />

              <InputElement
                type="text"
                name="mobile"
                placeholder="9829897397"
                value={this.state.mobileno}
                description="Enter Mobile No."
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
                    checked={this.state.city[0]}
                    onChange={this.handleCheckbox} />
                  <CustomInput
                    type="checkbox"
                    id="Surat"
                    label="Surat"
                    inline
                    checked={this.state.city[1]}
                    onChange={this.handleCheckbox} />
                  <CustomInput
                    type="checkbox"
                    id="Rajkot"
                    label="Rajkot"
                    inline
                    checked={this.state.city[2]}
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

              <Button
                color='primary'
                onClick={this.handleSubmit}
                block>
                Submit
              </Button>

            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;