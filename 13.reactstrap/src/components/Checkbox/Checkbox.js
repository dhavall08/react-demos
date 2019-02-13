import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, CustomInput } from 'reactstrap';

import './Checkbox.css';

const Checkbox = (props) => {
  const { valid, dataSource, checked, inline, changeListener, label, dataValue, dataName, simpleArray } = props;
  return (
    <FormGroup>
      {label && <Label for="city">{label}</Label>}
      {valid === false && <p className='invalid-msg'> *required</p>}
      <div>
        {
          dataSource.map((data, index) => {
            return (
              <CustomInput
                id={!simpleArray ? data[dataValue] : data}
                key={index}
                label={!simpleArray ? data[dataName] : data}
                type='checkbox'
                invalid={!valid && valid !== null}
                checked={checked && checked.includes(!simpleArray ? data[dataValue]: data)}
                inline={inline}
                onChange={changeListener} />
            )
          })
        }
      </div>
    </FormGroup>
  );
}

Checkbox.defaultProps = {
  valid: null,
  checked: null,
  inline: true,
  changeListener: null,
  simpleArray: false,
  dataValue: 'value',
  dataName: 'name'
}

Checkbox.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.any).isRequired,
  dataValue:PropTypes.string,
  dataName:PropTypes.string,
  label: PropTypes.string,
  valid: PropTypes.bool,
  checked: PropTypes.any,
  simpleArray: PropTypes.bool,
  inline: PropTypes.bool,
  changeListener: PropTypes.func,
}

export default Checkbox;