import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, CustomInput } from 'reactstrap';

const RadioButton = (props) => {
  const { valid, dataSource, checked, inline, changeListener, label, type, dataValue, dataName, simpleArray } = props;
  return (
    <FormGroup>
      {label && <Label for="city">{label}</Label>}
      {valid === false && <p className='invalid-msg'> *selection required</p>}
      <div>
        {
          dataSource.map((data, index) => {
            return (
              <CustomInput
                id={!simpleArray ? data[dataValue] : data}
                key={index}
                label={!simpleArray ? data[dataName] : data}
                type='radio'
                invalid={!valid && valid !== null}
                checked={!simpleArray ? checked === data[dataValue] : checked === data}
                inline={inline}
                onChange={changeListener} />
            )
          })
        }
      </div>
    </FormGroup>
  );
}

RadioButton.defaultProps = {
  valid: null,
  checked: null,
  inline: true,
  changeListener: null,
  simpleArray: false,
  dataValue: 'value',
  dataName: 'name',
}

RadioButton.propTypes = {
  simpleArray: PropTypes.bool,
  valid: PropTypes.bool,
  inline: PropTypes.bool,
  dataValue:PropTypes.string,
  dataName:PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.any,
  dataSource: PropTypes.arrayOf(PropTypes.any).isRequired,
  changeListener: PropTypes.func,
}

export default RadioButton;