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
                type={type}
                invalid={!valid && valid !== null}
                checked={!simpleArray ? checked === data[dataValue]: checked === data}
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
}

RadioButton.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.any).isRequired,
  type: PropTypes.oneOf(['radio', 'checkbox']),
  label: PropTypes.string,
  valid: PropTypes.bool,
  checked: PropTypes.any,
  inline: PropTypes.bool,
  changeListener: PropTypes.func,
}

export default RadioButton;