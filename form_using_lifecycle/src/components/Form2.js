import React, { Component } from 'react';
import InputField from './InputField';
import RadioComponent from './RadioComponent';
import SelectComponent from './SelectComponent';

class Form2 extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            gender: '',
            Ahmedabad: false,
            NewYork: false,
            London: false
        }
        console.log("Form2 Constructor");
    }
    componentWillReceiveProps(props) {
        console.log('Form2 willreceiveprops')
        if (this.props !== props) { // change only if props changes
            this.setState({
                name: props.value['name'],
                gender: props.value['gender'],
                Ahmedabad: props.value['Ahmedabad'],
                NewYork: props.value['NewYork'],
                London: props.value['London']
            }, () => { console.log(this.state) }); // callback should be function, not statement/expr.
        }
    }
    componentWillMount() {

        console.log("Form2 componentWillMount");
    }
    render() {
        console.log("Form2 render");
        return (
            <div>
                <fieldset>
                    <legend><strong><p>You have entered following details.</p></strong></legend>
                    <InputField
                        name="name"
                        value={this.state.name}
                        class="input"
                        type="text"
                        place="Enter Name"
                        disabled="disabled"
                    />
                    <RadioComponent
                        name="gender"
                        value={this.state.gender}
                        disabled="disabled"
                    />
                    <SelectComponent
                        name="city"
                        val={this.state}
                        disabled="disabled"
                    />


                </fieldset>
            </div>
        );
    }
}

export default Form2;