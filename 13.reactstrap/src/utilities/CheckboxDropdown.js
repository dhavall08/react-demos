import React, { Component } from 'react';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import './c.css';

const Option = (props) => {
  return (
    <div>
      {
        <components.Option {...props}>
          <input type="checkbox" checked={props.isSelected} onChange={() => { }} />{' '}
          <label>{props.label}</label>
        </components.Option>
      }
    </div>
  );
};

let selectAll = false;
let counter = 0;

const CheckboxDropdown = (props) => {
  const options = [...props.dataSource];
  options.unshift({ [props.dataValue]: 'selectAll', [props.dataLabel]: props.selectAllName });

  function handleChange(selectedOption) {
    const { dataValue, selectionListener } = props
    //to reset
    if (selectedOption.length !== 0) {
      //previously selected all and now value reset
      if (selectAll && selectedOption[0][dataValue] !== 'selectAll') {
        selectAll = false;
        counter = 0
        selectionListener([]);
        return;
      }
      // if 'select all' checked or all options are checked
      if ((selectedOption[selectedOption.length - 1][dataValue] === 'selectAll') || (!selectAll && selectedOption.length === options.length - 1)) {
        selectedOption = options;
        selectAll = true;
        counter = selectedOption.length - 1;
        let temp = selectedOption.map(option => option[dataValue]);
        temp.splice(0, 1);
        selectionListener(temp);
        console.log(selectedOption)
        return;
      }
      // if something checked after 'select all'
      selectedOption[0][dataValue] === 'selectAll' && (selectedOption.splice(0, 1));
    }
    // length zero or more
    selectAll = false;
    counter = selectedOption.length;
    selectionListener(selectedOption.map(option => option[dataValue])); /// pass value
  }

  const { dataSource, dataLabel, dataValue, inputProps, selected } = props;
  let valueSelected = options.filter((option) => selected.includes(option[dataValue]));
  (JSON.stringify(valueSelected) === JSON.stringify(dataSource) || valueSelected.includes('selectAll')) && (valueSelected = options);
  return (
    <Select
      {...inputProps}
      placeholder={inputProps.placeholder && `Selected ${inputProps.placeholder} ${counter}`}
      value={valueSelected}
      onChange={handleChange}
      options={options}
      getOptionLabel={(option) => option[dataLabel]}
      getOptionValue={(option) => option[dataValue]}
      components={{ Option }}
      isMulti={true}
    />
  );
}

CheckboxDropdown.defaultProps = {
  getOptionLabel: (option) => option('label'),
  getOptionValue: (option) => option('value'),
  inputProps: {
    placeholder: 'Services',
    hideSelectedOptions: false,
    closeMenuOnSelect: false,
    backspaceRemovesValue: false,
    controlShouldRenderValue: false,
    isSearchable: false,
  }
}
CheckboxDropdown.propTypes = {
  inputProps:PropTypes.shape ({
    placeholder: PropTypes.string,
    hideSelectedOptions: PropTypes.bool,
    closeMenuOnSelect: PropTypes.bool,
    backspaceRemovesValue: PropTypes.bool,
    controlShouldRenderValue: PropTypes.bool,
    isSearchable: PropTypes.bool,
  }),
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func
}

export default CheckboxDropdown;
