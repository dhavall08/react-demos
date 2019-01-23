import React, { Component } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

class Parent extends Component {
    constructor() {
        super();
        this.state = {
            signup: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            },
            signin: {
                login_email: '',
                login_pass: '',
            }
        }
    }
    /* other way
        newFun(value, field, form) {
            let obj = this.state[form];
            obj[field] = value;
            this.setState({ [form]: obj });
        }
    */
    render() {
        console.log("Signup", this.state.signup);
        console.log("Signin", this.state.signin);
        return (
            <div className="cntr">
                <div className="block" style={{ float: 'left' }}>
                    {/* passed function in setState instead of object */}
                    <SignUp
                        setValues={(value, field) => this.setState(state => (state.signup[field] = value))} />
                    {/* Another way
                    <SignUp
                        setValues={(value, field) => this.newFun(value, field, "signup")} />
                    */


                    }
                </div>
                <div className="block" style={{ float: 'right' }}>
                    <SignIn
                        setValues={(value, field) => this.setState(state => (state.signin[field] = value))} />
                </div>

            </div>
        );
    }
}

export default Parent;