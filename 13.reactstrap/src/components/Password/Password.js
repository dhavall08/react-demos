import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import InputElement from '../../components/InputElement/InputElement';

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirm: '',
      valid: {
        password: null,
        confirm: null
      }
    }

    this.errMsg = {
      password: props.emptyMessage,
      confirm: props.emptyMessage
    }
  }

  componentDidUpdate(prevProps) {
    const { confirm, valid } = this.state;
    if ((prevProps.validVal !== this.props.validVal)) {
      //this.setState({ password: this.props.value });
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
    this.setState({ [key]: value });
    key === 'password' && (this.props.changeFunc(value))
  }

  validationHandler = (value) => {
    const { password, confirm } = this.state;
    let compare = password === confirm && confirm !== '' ? true : false;
    confirm === '' && (this.errMsg.confirm = this.props.emptyMessage);
    this.setState({ valid: { password: value, confirm: compare } });
    if (!this.props.validationFunc)
      return;
    this.props.validationFunc((value && compare) ? true : false);
  }

  confirmPassword = () => {
    const { password, confirm, valid } = this.state;
    let compare = (password !== '' && confirm !== '') && (password === confirm);
    password === '' && (this.errMsg.password = this.props.emptyMessage);
    this.setState({ valid: { password: password === '' ? false : valid.password, confirm: compare } })
    if (!this.props.validationFunc)
      return;
    this.props.validationFunc((valid['password'] && compare) ? true : false);
  }

  errMsgHandler = (field, newVal) => {
    this.errMsg[field] = newVal;
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
            errMsg={this.errMsg.password}
            emptyMessage={this.props.emptyMessage}
            validationErrMsgText='Please enter valid password'
            regularEx={regularEx}
            valid={valid['password']}
            errMsgHandler={(newVal) => this.errMsgHandler('password', newVal)}
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
            errMsg={this.errMsg.confirm}
            emptyMessage={this.props.emptyMessage}
            validationErrMsgText='Password does not match or invalid.'
            valid={valid['confirm']}
            validationFunc={this.confirmPassword}
            errMsgHandler={(newVal) => this.errMsgHandler('confirm', newVal)}
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
  validationErrMsgText: 'Please enter valid value.',
  emptyMessage: 'Please fill out this field',
  validationErrMsgTextConfirm: 'Password does not match or invalid.',
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
  emptyMessage: PropTypes.string,
  validationErrMsgText: PropTypes.string,
  validationErrMsgTextConfirm: PropTypes.string,
  validationFunc: PropTypes.func,
  changeFunc: PropTypes.func,
}

export default Password;