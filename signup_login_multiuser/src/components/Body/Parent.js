import React, { Component } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

class Parent extends Component {
    constructor() {
        super();
        this.state = {
            signup: [],
            current: {
                firstName:'',
                lastName:'',
                email:'',
                password:'',
            },
            signin:{
                login_email:'',
                login_pass:''
            }
        }
        this.checkUserLogin=this.checkUserLogin.bind(this);
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
            let obj=this.state.signup;
            let existingUser = obj.filter((person)=>{
                if(person.email === this.state.current['email'])
                {
                    return 1;
                }
                else {return 0;}
            });
            if (existingUser.length !== 0) {
                return alert('Email id is already taken.')
            }
            else {
                let objs=this.state.signup;
                this.setState(state => ({ signup: [...objs, state.current] }));
                alert("Registered Successfully.")
               this.setState({ current: {} });
            }
        }
        else if (value !== 'submit') {
            let obj = this.state.current;
            obj[field] = value;
            this.setState({ current: obj });
        }
        else{
            alert("Empty/Invalid Fields.")
        }
    }

    checkUserLogin(value,field){
        if (value === 'signin' && this.state.signin['login_email'] !== "" && this.state.signin['login_pass'] !== "") {
            let obj=this.state.signup;
            let existingUser = obj.filter((person)=>{
                if(person.email === this.state.signin['login_email'] && person.password === this.state.signin['login_pass'])
                {
                    return 1;
                }
                else {return 0;}
            });
            if (existingUser.length !==0) {
                return alert('Login Successful.');
            }
            else{
                //this.setState({signin:{}});
                return alert('Incorrect Email/Password.');
            }
        }
        else if (value !== 'signin') {
            let obj = this.state.signin;
            obj[field] = value;
            this.setState({ signin: obj });
        }
        else{
            return alert('Invalid Email');
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