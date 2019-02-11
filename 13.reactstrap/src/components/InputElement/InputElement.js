import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import './InputElement.css'

const InputElement = (props) => {
  //close button
  function validationHandler(e) {
    e.preventDefault();
    if (!props.validationFunc)
      return;
    let regx = null, field = e.target;
    if (!props.regularEx) {
      switch (field.name) {
        case 'username':
          regx = /^([a-zA-Z]+[a-zA-Z0-9_]*)$/;
          break;
        case 'email':
          regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          break;
        case 'password':
          regx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
          break;
        case 'mobile':
          regx = /^[0-9]{10}$/;
          break;
        case 'confirmPassword':
          props.validationFunc();
          return;
        default:
          break;
      }
    }
    else {
      regx = new RegExp(props.regularEx);
    }
    regx && (regx.test(field.value)
      ? props.validationFunc(true)
      : props.validationFunc(false));
  }

  function changeHandler(e) {
    if (!props.changeFunc)
      return;
    props.changeFunc(e.target.value)
  }

  let { name, type, heading, placeholder, valid, maxLength, errMsg, validSymbol } = props;
  return (
    <FormGroup>
      {heading && <Label for={name}>{heading}</Label>}
      <Input
        name={name}
        type={type}
        value={props.value}
        className={valid !== null ? ((!valid ? 'is-invalid ' : 'is-valid ') + (!validSymbol ? 'no-symbol' : '')) : null}
        placeholder={placeholder}
        maxLength={maxLength}
        onBlur={(e) => validationHandler(e)}
        onChange={(e) => changeHandler(e)}
      />
      { // error message pass in props
        !valid ?
          <React.Fragment>
            <FormFeedback className='is-invalid'>
              {name !== 'confirmPassword' ? (errMsg || 'Please enter valid ' + name) : <>Password does not match or invalid.</>}
            </FormFeedback>

          </React.Fragment>
          : null
        }
        {props.info && <FormText>{props.info}</FormText>}
    </FormGroup>
  );

}

InputElement.defaultProps = {
  validSymbol: true,
  type: 'text',
  placeholder: 'Enter text',
  changeFunc: null,
  validationFunc: null,
  valid: null,
  maxLength: null,
  regularEx: null,
}

InputElement.propTypes = {
  valid: PropTypes.bool,
  validSymbol :PropTypes.bool,
  maxLength: PropTypes.number,
  errMsg: PropTypes.string,
  type: PropTypes.string,
  info: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  regularEx: PropTypes.string,
  changeFunc: PropTypes.func,
  validationFunc: PropTypes.func,
}

export default InputElement;