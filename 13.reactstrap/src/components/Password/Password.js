import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';

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
    const { confirm, valid } = this.state;
    if ((prevProps.validVal !== this.props.validVal)) {
        console.log('didinside');
        //this.setState({ password: this.props.value });
      if (valid.password === null && valid.confirm === null) {
        console.log('did---');
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
    this.setState({ [key]: value });
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
            inputProps={{
              type: "password",
              name: "password",
              placeholder: "Password",
              value: value,
            }}
            heading={heading ? "Enter Password" : undefined}
            info={info}
            errMsg="Please enter valid password."
            regularEx={regularEx}
            valid={valid['password']}
            validationFunc={(value) => this.validationHandler(value)}
            changeFunc={(value) => this.changeHandler('password', value)} />
        </Col>
        <Col md={{ size: 6 }}>
          <InputElement
            inputProps={{
              type: "password",
              name: "confirmPassword",
              placeholder: "Confirm",
              value: confirm
            }}
            heading={heading ? "Confirm Password" : undefined}
            errMsg="Password does not match or invalid."
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
  validationFunc: () => { },
  changeFunc: () => { },
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