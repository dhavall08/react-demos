import React from 'react';
import { FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import PropTypes from 'prop-types';

const InputElement = (props) => {

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
      regx = props.regularEx;
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
  function displayDescription() {
    switch (props.name) {
      case 'username':
        return <FormText>Username should starts with letter. ex. John_123</FormText>
      case 'email':
        return <FormText>ex. john@business.com</FormText>
      case 'password':
        return <FormText>Password should contain digit, letter and special character. <br /> Length should be between 6 to 16.</FormText>
      case 'mobile':
        return <FormText>Enter 10 digits mobile number.</FormText>
      default: return
    }
  }

  let { name, type, description, placeholder, valid, maxLength } = props;
  return (
    <FormGroup>
      <Label for={name}>{description}</Label>
      <Input
        name={name}
        type={type}
        value={props.value}
        className={valid !== null ? (!valid ? 'is-invalid' : 'is-valid') : null}
        placeholder={placeholder}
        maxLength={maxLength}
        onBlur={(e) => validationHandler(e)}
        onChange={(e) => changeHandler(e)}
      />
      {
        !valid ?
          <React.Fragment>
            <FormFeedback className='is-invalid'>
              {name !== 'confirmPassword' ? <>Please enter valid {name}.</> : <>Password does not match or invalid.</>}
            </FormFeedback>
            {displayDescription()}
          </React.Fragment>
          : null
      }
    </FormGroup>
  );

}

InputElement.defaultProps = {
  type: 'text',
  placeholder: 'Enter text',
  changeFunc: null,
  validationFunc: null,
  valid: null,
  maxLength: null,
  regularEx: null,
}

InputElement.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  changeFunc: PropTypes.func,
  validationFunc : PropTypes.func,
  valid : PropTypes.bool,
  maxLength : PropTypes.number,
  regularEx : PropTypes.string,
}

export default InputElement;