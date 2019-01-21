import React, { Component } from 'react';

class ComputerDept extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            loading: false
        }
    }

    getUserData() {
        let login = {
            email: "sydney@fife",
            password: ''
        };

        this.setState({ loading: true });
        fetch('https://reqres.in/api/users?page=3')
            .then(res => {
                console.log('res=', res);
                return res.json();
            })
            .then(res => {
                console.log('res=', res);
                this.setState({ userList: res.data || [], loading: false })
            });

        fetch('https://reqres.in/api/register', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(login), // body data type must match "Content-Type" header
        }).then(res => res.json()).then(res => console.log(JSON.stringify(login))); //not working

    }
    render() {
        return (
            <div>
                <button onClick={() => {
                    this.getUserData();
                }}>Click Here</button>
                {this.state.loading ? <h4>Loading...</h4> : null}
                {
                    this.state.userList.map((u, i) => {
                        return <div key={i}>
                            <br />
                            <b>First Name:</b> {u.first_name}<br />
                            <b>Last Name:</b> {u.last_name}<br />
                            <hr />
                        </div>
                    })
                }
                <img src={this.state.image}/>
                <label>{this.state.name}</label>
            </div>
        );
    }
}

export default ComputerDept;