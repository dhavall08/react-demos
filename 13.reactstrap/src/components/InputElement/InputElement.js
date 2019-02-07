import React from 'react';
import { FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';


const InputElement = (props) => {

  function validationHandler(e) {
    e.preventDefault();
    let regx, field = e.target;
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
        return;
      default:
        break;
    }

    if (regx.test(field.value)) {
      props.validationEvent(true);
    }
    else {
      props.validationEvent(false);
    }
  }

  function changeHandler(e) {
    props.changeEvent(e.target.value)
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

  let { name, type, description, placeholder, valid } = props;
  return (
    <FormGroup>
      <Label for={name}>{description}</Label>
      <Input
        name={name}
        type={type}
        value={props.value}
        className={valid !== null ? (!valid ? 'is-invalid' : 'is-valid') : null}
        placeholder={placeholder}
        onBlur={(e) => validationHandler(e)}
        onChange={(e) => changeHandler(e)}
      />
      {
        !valid ?
          <React.Fragment>
            <FormFeedback className='is-invalid'>
              {name !== 'confirmPassword' ? <>Please enter valid {name}.</> : <>Password does not match.</>}
            </FormFeedback>
            {displayDescription()}
          </React.Fragment>
          : null
      }
    </FormGroup>
  );

}

export default InputElement;