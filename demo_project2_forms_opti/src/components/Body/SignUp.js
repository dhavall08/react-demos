import React, { Component } from 'react';
import InputField from './InputField';
import './style.css';

class SignUp extends Component {

    render() {
        return (
            <div>
                <form onSubmit={e => e.preventDefault()} >
                    <p className="heading">Sign Up</p>
                    <InputField
                        name="firstName"
                        type="text"
                        place="Enter First Name"
                        blurevent={this.props.setValues} />

                    <InputField
                        name="lastName"
                        type="text"
                        place="Enter Last Name"
                        blurevent={this.props.setValues} />

                    <InputField
                        name="email"
                        type="email"
                        blurevent={this.props.setValues} />

                    <InputField
                        name="password"
                        type="password"
                        place="Enter Password"
                        blurevent={this.props.setValues} />

                    <input
                        className="form"
                        style={{ width: '100%', color: 'white', background: 'rgb(144, 52, 183)', marginTop: '90px' }}
                        name="signup"
                        value="Register"
                        type="submit" />
                </form>
            </div>
        );
    }
}

export default SignUp;