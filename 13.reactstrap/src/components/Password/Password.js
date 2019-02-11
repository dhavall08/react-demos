import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import InputElement from '../../components/InputElement/InputElement';

class Password extends Component {
  state = {
    password: '',
    confirm: '',
    valid: {
      password: null,
      confirm: null
    }
  }

  componentDidUpdate(prevProps) {
    const { password, confirm, valid } = this.state;
    if (prevProps !== this.props) {
      this.setState({ password: this.props.value });
      if (valid.password === null && valid.confirm === null) {
        let compare = this.props.value === confirm;
        this.setState({
          valid: {
            password: this.props.validVal,
            confirm: compare ? this.props.validVal : false,
          }
        });
      }
    }

    if (this.props.reset) {
      this.setState({
        password: '',
        confirm: '',
        valid: {
          password: null,
          confirm: null
        }
      })
    }
  }

  changeHandler = (key, value) => {
    const { confirm, valid } = this.state;
    this.setState({ [key]: value });
    key === 'password' && (this.props.changeFunc(value))
    key === 'password' && confirm !== '' && (this.setState({ valid: { ...valid, confirm: value !== confirm ? false : true } }));
  }

  validationHandler = (value) => {
    const { password, confirm } = this.state;
    let compare = password === confirm && confirm !== '' ? true : false;
    this.setState({ valid: { password: value, confirm: compare } });
    this.props.validationFunc((value && compare) ? true : false);
  }

  confirmPassword = () => {
    const { password, confirm, valid } = this.state;
    let compare = (password !== '' && confirm !== '') && (password === confirm);
    this.setState({ valid: { ...valid, confirm: compare } })
    this.props.validationFunc((valid['password'] && compare) ? true : false);
  }

  render() {
    return (
      <Row>
        <Col md={{ size: 6 }}> //dynamic size
          <InputElement
            type="password"
            name="password"
            placeholder="Password"
            valid={this.state.valid['password']}
            value={this.props.value}
            description="Enter Password"
            validationFunc={(value) => this.validationHandler(value)}
            changeFunc={(value) => this.changeHandler('password', value)} />
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
            validationFunc={this.confirmPassword}
            changeFunc={(value) => this.changeHandler('confirm', value)} />
        </Col>
      </Row>

    );
  }
}

export default Password;