import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import axios from 'axios';
import { debounce } from 'lodash';
const AsyncFetch = (props) => {

  const fetchData = (inputValue, callback) => {
    inputValue && axios.get(props.url + inputValue).then(function (response) {
      let temp = response.data.data.items.map(val =>
        ({ label: val.name, value: val.identifier }));
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
    props.changeHandler(inputValue);
  }

  return (
    <div>
      <AsyncSelect
        value={props.value}
        loadOptions={loadOptions}
        defaultOptions
        onChange={handleInputChange}
      />
    </div>
  );

}

export default AsyncFetch;