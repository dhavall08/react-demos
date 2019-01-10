import React, { Component } from 'react';

class InputField extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        const validate = (e) => {
            let re = /.+/;
            switch (e.target.name) {
                case "email":
                case "login_email":
                    re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    break;
                case "password":
                    re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
                    break;
                case "firstName":
                    re = /^[A-Z]*[a-z]*$/;
                    break;
                case "lastName":
                    re = /^[A-Z]*[a-z]*$/;
                    break;
                default: break;
            }
            if (re.test(e.target.value)) {
                this.setState({ [e.target.name]: true });
                this.props.blurevent(e.target.value, this.props.name);
                e.target.style.border = 'lightgrey solid';
            }
            else {
                this.setState({ [e.target.name]: false });
                this.props.blurevent('', this.props.name);
                e.target.style.border = '#ff4b4b solid';
            }
        }

        return (
            <div>
                <input className="form" autoComplete="off"
                    style={{ background: 'white', borderWidth: '2px', border: 'lightgrey solid' }}
                    name={this.props.name}
                    type={this.props.type}
                    placeholder={this.props.place || this.props.name /* if value is not passed of placeholder */}
                    onChange={(e) => validate(e)}
                    required />
            </div>
        );
    }
}

export default InputField;
