import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import InputElement from '../../components/InputElement/InputElement';
import PropTypes from 'prop-types';

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
    const { confirm, valid } = this.state;
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
    key === 'password' && confirm !== '' && (this.setState({ valid: { ...valid, confirm: value !== confirm ? false : true } }));
    if (!this.props.validationFunc)
      return;
    key === 'password' && (this.props.changeFunc(value))
  }

  validationHandler = (value) => {
    const { password, confirm } = this.state;
    let compare = password === confirm && confirm !== '' ? true : false;
    this.setState({ valid: { password: value, confirm: compare } });
    if (!this.props.validationFunc)
      return;
    this.props.validationFunc((value && compare) ? true : false);
  }

  confirmPassword = () => {
    const { password, confirm, valid } = this.state;
    let compare = (password !== '' && confirm !== '') && (password === confirm);
    this.setState({ valid: { ...valid, confirm: compare } })
    if (!this.props.validationFunc)
      return;
    this.props.validationFunc((valid['password'] && compare) ? true : false);
  }

  render() {
    const { info, value, heading, regularEx } = this.props;
    const { valid, confirm } = this.state;
    return (
      <Row>
        <Col md={{ size: 6 }}>
          <InputElement
            type="password"
            name="password"
            heading={heading ? "Enter Password" : undefined}
            placeholder="Password"
            info={info}
            errMsg="Please enter valid password."
            regularEx={regularEx}
            value={value}
            valid={valid['password']}
            validationFunc={(value) => this.validationHandler(value)}
            changeFunc={(value) => this.changeHandler('password', value)} />
        </Col>
        <Col md={{ size: 6 }}>
          <InputElement
            type="password"
            name="confirmPassword"
            heading={heading ? "Confirm Password" : undefined}
            placeholder="Confirm"
            errMsg="Password does not match or invalid."
            value={confirm}
            valid={valid['confirm']}
            validationFunc={this.confirmPassword}
            changeFunc={(value) => this.changeHandler('confirm', value)} />
        </Col>
      </Row>

    );
  }
}

Password.defaultProps = {
  heading: false,
  validVal: null,
  reset: false,
  validationFunc: null,
  changeFunc: null,
}

Password.propTypes = {
  regularEx: PropTypes.string,
  info: PropTypes.string,
  value: PropTypes.string,
  heading: PropTypes.bool,
  validVal: PropTypes.bool,
  reset: PropTypes.bool,
  validationFunc: PropTypes.func,
  changeFunc: PropTypes.func,
}

export default Password;