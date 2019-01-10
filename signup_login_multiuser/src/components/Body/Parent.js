import React, { Component } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

class Parent extends Component {
    constructor() {
        super();
        this.state = {
            signup: [],
            current: {},
            signin:{}

        }
    }
    /* other way
        newFun(value, field, form) {
            let obj = this.state[form];
            obj[field] = value;
            this.setState({ [form]: obj });
        }
    */

    addNewUser(value, field) {
        if (value === 'submit' && this.state.current['firstName'] !== "" && this.state.current['lastName'] !== "" && this.state.current['email'] !== "" && this.state.current['password'] !== "") {
            let existingUser = this.state.signup.filter((person) => person.email === this.state.current['email'])
            if (existingUser.length !==0) {
                return alert('Email id is already taken.')
            }
            else {
                this.setState(state => ({ signup: [...state.signup, state.current] }));
               // this.setState({ current: {} });
            }
        }
        else if (value !== 'submit') {
            let obj = this.state.current;
            obj[field] = value;
            this.setState({ current: obj });
        }
    }

    checkUserLogin(value,field){
        if (value === 'signin' && this.state.current['login_email'] !== "" && this.state.current['login_pass'] !== "") {
            let existingUser = this.state.signup.filter((person) => person.email === this.state.current['email'])
            if (existingUser.length !==0) {
                return alert('Email id is already taken.')
            }
            else {
                this.setState(state => ({ signup: [...state.signup, state.current] }));
               // this.setState({ current: {} });
            }
        }
        else if (value !== 'submit') {
            let obj = this.state.current;
            obj[field] = value;
            this.setState({ current: obj });
        }

    }
    
    render() {
       // console.log("Signup", this.state.signup);
       // console.log("Signin", this.state.signin);
        return (
            <div className="cntr">
                <div className="block" style={{ float: 'left' }}>
                    {/* passed function in setState instead of object */}
                    <SignUp
                        setValues={(value, field) => this.addNewUser(value, field)}
                        newForm="true" />
                    {/* Another way
                    <SignUp
                        setValues={(value, field) => this.newFun(value, field, "signup")} />
                    */
                    }
                </div>
                <div className="block" style={{ float: 'right' }}>
                    <SignIn
                        setValues={(value, field) => this.checkUserLogin(value,field)} />
                </div>

            </div>
        );
    }
}

export default Parent;