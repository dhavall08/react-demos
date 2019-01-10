import React, { Component } from 'react';
import InputField from './InputField';

class SignIn extends Component {

    doSubmit(e){
        e.preventDefault();
        this.props.setValues('signin','');
    }

    render() {
        return (
            <div>
                <form onSubmit={e => e.preventDefault()} >
                    <p
                        className="heading">Sign In</p>
                    <InputField
                        name="login_email"
                        type="email"
                        place="Enter Email"
                        blurevent={this.props.setValues} />

                    <InputField
                        name="login_pass"
                        type="password"
                        place="Enter Password"
                        blurevent={this.props.setValues} />

                    <input
                        style={{ width: '100%', color: 'white', background: 'rgb(144, 52, 183)', marginTop: '175px' }}
                        className="form"
                        value="Sign In"
                        type="submit"
                        onClick={e=>this.doSignIn(e)}  />
                </form>
            </div>
        );
    }
}

export default SignIn;
