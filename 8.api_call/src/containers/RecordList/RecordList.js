import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './RecordList.css'

import { apiListRecords, apiDeleteRecord, getUserList } from '../../api/api';

class RecordList extends Component {
    constructor() {
        super();
    }
    state = {
        loading: true,
        users: {},
        currentPage: 1,
        pagechange: false,
        error: false,
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.fetchUrl();
    }

    fetchUrl() {
        getUserList(this.state.currentPage)
        .then(res=>{
            if(!res.success){
                this.setState({loading: false, users: null})
            }
            this.setState({ users: res.data.users, loading: false, pagechange: false, error: false }, () => {
                console.log(res.data);
            });
        })


            console.log(this.state);
            apiListRecords(this.state.currentPage, res => {
                console.log(res);
                if (res.success === true) {
                    this.setState({ users: res.data.users, loading: false, pagechange: false, error: false }, () => {
                        console.log(res.data);
                    });
                }
                else {
                    this.setState({ loading: false, error: true });
                    alert('Error', res.error);
                }
            });
      
    }
    pagesRender = (total_pages) => {
        /*for (let i = 1; i <= total_pages; i++) {
            let class_names = ['page'];
            parseInt(this.state.currentPage) === i ? class_names.push('pageselected') : class_names.push('otherpages');
            pagearray.push(<button key={i} id={i} onClick={(e) => this.paginationClickHandler(e)} className={class_names.join(' ')}>{i}</button>);
        }
        return (
            <div className="pagination">{pagearray}</div>
        );
        
        */

        return <div className="pagination">
            {Array(total_pages).fill().map((page, i) => {
                return <button
                    key={i + 1}
                    className={this.state.currentPage === i + 1 ? 'page pageselected' : 'page otherpages'}
                    disabled={this.state.currentPage === i + 1 ? true : false}
                    onClick={(e) => this.paginationClickHandler(e, i + 1)}>
                    {i + 1}
                </button>
            })}
        </div>

    }

    deleteRecordClickHandler = (e, id) => {
        let y = window.confirm("Are you sure you want to delete this user?");
        console.log(y);
        let res;
        y && (res = apiDeleteRecord(id))

        if (res.success) {
            alert('Deleted Successfully.');
            console.log('Delete Occurred: ', res.error)
            this.fetchUrl();
        }
        else {
            alert('Error Occurred: ' + res.error);
            console.log('Error Occurred: ', res.error);
        }

    }

    paginationClickHandler(e, page) {
        e.preventDefault();
        (this.setState({ currentPage: page, pagechange: true }, () => {
            this.fetchUrl();
            // debugger
        }))

    }

    renderList
    render() {
        console.log("render");
        return (
            <div className='recordList'>
                {this.state.loading ? <p className='message'>Please wait while we are getting user details...</p> :
                    (this.state.error ? <p className='message'>Something went wrong!</p> :
                        <div>
                            <div className='div-table'>
                                <div className='div-row heading-row'>
                                    <div className="div-col heading-col"><strong>Firstname</strong></div>
                                    <div className="div-col heading-col"><strong>Lastname</strong></div>
                                    <div className="div-col heading-col"><strong>Avatar</strong></div>
                                    <div className="div-col heading-col"><strong>Action</strong></div>
                                </div>
                                {//condition for empty table
                                }

                                {this.state.loading || this.state.users.data.map((user, index) => (
                                    <div key={index} className='div-row'>
                                        <div className="div-col">{user.first_name}</div>
                                        <div className="div-col">{user.last_name}</div>
                                        <div className="div-col"><img alt="Profile" src={user.avatar} /></div>
                                        <div className="div-col">
                                            <NavLink className='actions' to={"/list/" + (user.id)}>Edit</NavLink><span> | </span>
                                            <NavLink to='#' onClick={(e) => { this.deleteRecordClickHandler(e, user.id) }} className='actions' delete={(user.id)}>Delete</NavLink>
                                        </div>
                                    </div>
                                )) // if { } bracket, then write return
                                    // navlink 
                                }
                            </div>
                            {this.pagesRender(this.state.users.total_pages)}
                            {this.state.pagechange && <span className="fetching">Fetching data...</span>}
                        </div>
                    )}
            </div>
        );
    }
}

export default RecordList;
