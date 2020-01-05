import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import './InputElement.css';

const InputElement = React.memo((props) => {

  function validationHandler(e) {
    e.preventDefault();
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
          break;
        default:
          break;
      }
    }
    else {
      regx = new RegExp(props.regularEx);
    }

    if (regx && (regx.test(field.value))) {
      props.validationFunc(true)
    } else {
      props.validationFunc(false);
      props.inputProps.value === ''
        ? props.errMsgHandler(props.emptyMessage)
        : props.errMsgHandler(props.validationErrMsgText)
    }

    /* regx && (regx.test(field.value)
    ? props.validationFunc(true)
    : this.props.inputProps.value === ''
      ? props.validationFunc('Input is required.')
      : props.validationFunc(this.props.errMsg)); */
  }

  function changeHandler(e) {
    props.changeFunc(e.target.value)
  }

  let { inputProps, heading, valid, maxLength, errMsg, validSymbol } = props;
  return (
    <FormGroup>
      {console.log('run')}
      {heading && <Label for={inputProps.name}>{heading}</Label>}
      <Input
        {...inputProps}
        className={
          valid !== null
            ? ((!valid ? 'is-invalid ' : 'is-valid ') + (!validSymbol ? 'no-symbol '
              : ''))
            + inputProps.className : null
        }
        maxLength={maxLength}
        onBlur={(e) => validationHandler(e)}
        onChange={(e) => changeHandler(e)}
      />
      {
        !valid ?
          <React.Fragment>
            <FormFeedback className='is-invalid'>
              {errMsg || 'Please enter valid ' + inputProps.name}
            </FormFeedback>
          </React.Fragment>
          : null
      }
      {props.info && <FormText>{props.info}</FormText>}
    </FormGroup>
  );

},
  function (prevProps, nextProps) {
    return ((prevProps.inputProps.value === nextProps.inputProps.value)
      && (prevProps.valid === nextProps.valid)
      && (prevProps.errMsg === nextProps.errMsg))

    /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    */
  })


InputElement.defaultProps = {
  inputProps: {
    name: 'text',
    type: 'text',
    placeholder: 'Enter text',
  },
  valid: null,
  validSymbol: true,
  maxLength: null,
  regularEx: null,
  validationErrMsgText: 'Please enter valid value.',
  emptyMessage: 'Please fill out this field',
  changeFunc: () => { },
  validationFunc: () => { },
  errMsgHandler: () => { }
}

InputElement.propTypes = {
  inputProps: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string
  }),
  valid: PropTypes.bool,
  validSymbol: PropTypes.bool,
  maxLength: PropTypes.number,
  errMsg: PropTypes.string,
  emptyMessage: PropTypes.string,
  validationErrMsgText: PropTypes.string,
  errMsgHandler: PropTypes.func,
  info: PropTypes.string,
  regularEx: PropTypes.string,
  changeFunc: PropTypes.func.isRequired,
  validationFunc: PropTypes.func,
}

export default InputElement;