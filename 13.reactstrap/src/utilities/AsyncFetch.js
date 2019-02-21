import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { debounce } from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';

const AsyncFetch = (props) => {

  const fetchData = (inputValue, callback) => {
    inputValue && axios.get(props.url + inputValue).then(function (response) {
      let temp = response.data.data.items.map(val => {
        let tempItem = { ...{ ...val }, label: val[props.dataLabel], value: val[props.dataValue] }
        delete tempItem[props.dataLabel];
        delete tempItem[props.dataValue];
        return tempItem;
      })
      callback(temp);
    })
      .catch(function (error) {
        console.log(error);
      })

  };

  const loadOptions = debounce((value, callback) => {
    console.log(props);
    fetchData(value, callback);
  }, props.debounceWait);


  const handleInputChange = (inputValue) => {
    let tempItem = { ...{ ...inputValue }, [props.dataLabel]: inputValue.label, [props.dataValue]: inputValue.value }
    delete tempItem['label'];
    delete tempItem['value'];
    props.changeHandler(tempItem);
  }

  const handleValue = (value) => {
    if (!value) {
      return;
    }
    let tempItem = { ...value, label: value[props.dataLabel], value: value[props.dataValue] };
    delete tempItem[props.dataLabel];
    delete tempItem[props.dataValue];
    return tempItem;
  }

  return (
    <div>
      <AsyncSelect
        {...props.inputProps}
        value={handleValue(props.value)}
        loadOptions={loadOptions}
        defaultOptions
        onChange={handleInputChange}
      />
    </div>
  );

}

AsyncFetch.defaultProps = {
  debounceWait: 500,
  dataLabel: 'label',
  dataValue: 'value',
  changeHandler: () => { }
}

AsyncFetch.propTypes = {
  url: PropTypes.string.isRequired,
  debounceWait: PropTypes.number,
  dataLabel: PropTypes.string,
  dataValue: PropTypes.string,
  changeHandler: PropTypes.func,
}

export default AsyncFetch;