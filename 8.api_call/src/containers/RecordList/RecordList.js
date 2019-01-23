import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './RecordList.css'
import axios from 'axios';

class RecordList extends Component {
    state = {
        loading: true,
        users: [],
        currentPage: 1,
        pagechange: false,
    }
    componentDidMount() {
        console.log("componentDidMount");
        this.fetchUrl();
    }

    componentWillReceiveProps() {
        console.log("componentWillReceiveProps");
    }

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate");
        return true;
    }

    componentWillUpdate() {
        console.log("componentWillUpdate");
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
        //  this.fetchUrl();
    }
    fetchUrl = () => {
        let url = 'https://reqres.in/api/users/';
        axios.get(url,{
            params: {
                page : this.state.currentPage
            }
        })
            .then(res => {
                this.setState({ users: res.data, loading: false, pagechange: false }, () => { console.log(res.data) });
            }).catch(function (error) {
                console.log(error);
            });
    }
    getPages = () => {
        let pagearray = [];
        for (let i = 1; i <= this.state.users.total_pages; i++) {
            if (this.state.currentPage == i) { // not === compare
                pagearray.push(<button key={i} id={i} onClick={e => e.preventDefault()} className="page pageselected" disabled>{i}</button>);
            }
            else {
                pagearray.push(<button key={i} id={i} onClick={e => this.paginationClickHandler(e)} className="page otherpages">{i}</button>);
            }
        }

        return (
            <div className="pagination">{pagearray}</div>
        );
    }
    paginationClickHandler(e) {
        e.preventDefault();
        (this.setState({ currentPage: e.target.id, pagechange: true }, () => {
            this.fetchUrl();
            // debugger
        }))

    }
    render() {
        console.log("render");
        return (
            <>
                {this.state.loading ? <p>Please wait while we are getting user details...</p> :
                    <div>
                        <div className='div-table'>
                            <div className='div-row'>
                                <div className="div-col"><strong>Firstname</strong></div>
                                <div className="div-col"><strong>Lastname</strong></div>
                                <div className="div-col"><strong>Avatar</strong></div>
                                <div className="div-col"><strong>Action</strong></div>
                            </div>

                            {this.state.loading || this.state.users.data.map((user, index) => (
                                <div key={index} className='div-row'>
                                    <div className="div-col">{user.first_name}</div>
                                    <div className="div-col">{user.last_name}</div>
                                    <div className="div-col"><img alt="Profile" src={user.avatar} /></div>
                                    <div className="div-col">
                                        <NavLink to="">Edit</NavLink> |
                                    <NavLink to=""> Delete</NavLink>
                                    </div>
                                </div>
                            )) // if { } bracket, then write return
                            }
                        </div>
                        {this.getPages()}
                        {this.state.pagechange && <span className="fetching">Fetching details..</span>}
                    </div>
                }
            </>
        );
    }
}

export default RecordList;
