import React, { Component } from 'react';
import CheckboxDropdown from '../../utilities/CheckboxDropdown';
import GridView from '../../utilities/GridView';
import AsyncFetch from '../../utilities/AsyncFetch';

const options2 = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const options = [
  { id: 'chocolate', display: 'Chocolate' },
  { id: 'strawberry', display: 'Strawberry' },
  { id: 'vanilla', display: 'Vanilla' },
  { id: 'chocolate1', display: 'Chocolate' },
  { id: 'strawberry1', display: 'Strawberry' },
  { id: 'vanilla1', display: 'Vanilla' },
  { id: 'chocolate2', display: 'Chocolate' },
  { id: 'strawberry2', display: 'Strawberry' },
  { id: 'vanilla2', display: 'Vanilla' },
];

class MultipleComponent extends Component {
  state = {
    selectedDropdown: [],
    inputValue:'',
  }

  selectionListener = (selectedItems) => {
    this.setState({ selectedDropdown: selectedItems });
    console.log(selectedItems)
  }

  asyncChangeHandler = (value) => {
    this.setState({ inputValue: value });
  }

  render() {
    return (
      <>
        <CheckboxDropdown
          inputProps={{
            placeholder: 'Properties',
            hideSelectedOptions: false,
            closeMenuOnSelect: false,
            backspaceRemovesValue: false,
            controlShouldRenderValue: false,
            isSearchable: true
          }}
          selectionListener={this.selectionListener}
          selectAllName='Select All'
          dataSource={options}
          selected={this.state.selectedDropdown}
          dataValue='id'
          dataLabel='display' />

        {/* <GridView /> */}
        <AsyncFetch
          inputProps={{}}
          url='https://demo.dataverse.org/api/search?q='
          value={this.state.inputValue}
          debounceWait={500}
          dataLabel='name'
          dataValue='identifier'
          changeHandler={this.asyncChangeHandler} />
      </>
    );
  }
}

export default MultipleComponent;
