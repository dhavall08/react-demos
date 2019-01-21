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
            "email": "peter@klaven",
            "password": "cityslicka"
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


        fetch('https://reqres.in/api/login', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(login),
            headers: {
                "Content-type": "application/json; charset=UTF-8"//for url encoded if pass through encoding
            } // body data type must match "Content-Type" header
        }).then(res => res.json()).then(res => console.log("POST ", res)); //not working

        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            body: JSON.stringify({
                id: 1,
                title: 'foo',
                body: 'bar',
                userId: 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
            .then(json => console.log('PUT', json))

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({ tittle: 'asdf', body: 'asdff' })
        }).then((res) => res.json())
            .then((data) => console.log('Post ', data))
            .catch((err) => console.log('Post ', err))

        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'DELETE'
        }).then(res=>res.json()).then(res=>console.log('Delete',res));
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
                <img src={this.state.image} />
                <label>{this.state.name}</label>
            </div>
        );
    }
}

export default ComputerDept;