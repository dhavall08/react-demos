import React, { Component } from 'react';
import { Button, Form, Col, Row, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import InputElement from '../../components/InputElement/InputElement';
import './Register.css';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    mobileno: '',
    address: '',
    gender: '',
    city: '',
    valid: null,
  }

  changeHandler = (key, value) => {
    value[1] ? this.setState({ [key]: value[0], valid: true }) :
      this.setState({ [key]: value[0], valid: false })
  }
  render() {
    return (
      <Container>
        <Row className='form'>
          <Col md={{ size: 6, offset: 3 }}>
            <p className="heading">Registration Form</p>
            <Form>
              <InputElement
                type="text"
                name="username"
                value={this.state.username}
                description="Enter Username"
                changeEvent={(value) => { this.changeHandler('username', value); }} />

              <InputElement
                type="email"
                name="email"
                value={this.state.email}
                description="Enter Email"
                changeEvent={(value) => { this.changeHandler('email', value); }} />

              <InputElement
                type="text"
                name="mobile"
                value={this.state.email}
                description="Enter Mobile No."
                changeEvent={(value) => { this.changeHandler('mobileno', value); }} />

              <InputElement
                type="password"
                name="password"
                value={this.state.password}
                description="Enter Password"
                changeEvent={(value) => { this.changeHandler('password', value); }} />
              <br /><br />

              <FormGroup>
                <Label for='address'>Enter your Address</Label>
                <Input type="textarea"
                  name="address"
                  value={this.state.address}
                  rows='3'
                  placeholder="1207, Times Square, Thaltej, Ahmedabad."
                  onChange={(e) => this.setState({ address: e.target.value })} />
              </FormGroup>

              <br /><br />
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;