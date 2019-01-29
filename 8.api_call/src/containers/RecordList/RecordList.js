import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './RecordList.css'
import NewRecord from '../NewRecord/NewRecord';
import EditRecord from '../EditRecord/EditRecord';

import { apiListRecords, apiDeleteRecord } from '../../api/api';

class RecordList extends Component {
    state = {
        loading: true,
        users: {},
        currentPage: 1,
        pagechange: false,
        error: false
    }
    componentDidMount() {
        console.log("componentDidMount");
        this.fetchUrl();
    }

    fetchUrl = () => {
        apiListRecords(this.state.currentPage)
            .then(res => {
                this.setState({ users: res.data, loading: false, pagechange: false, error: false }, () => {
                    console.log(res.data);
                });
            }).catch((error) => {
                console.log(error);
                this.setState({ loading: false, error: true });
            });
    }
    pagesRender = (total_pages) => {
        let pagearray = Array(5).fill().map((x, i) => i);
        pagearray.length = total_pages;
        console.log(pagearray)
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
            {[...pagearray].map((page, i) => {
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
        y && (apiDeleteRecord(id)
            .then(res => {
                (res.status === 204 || res.status === 200)
                    ? alert('Deleted Successfully.') : alert('Something went wrong!');
                console.log('Delete Occurred: ', res)
                this.fetchUrl();
            })
            .catch(error => {
                alert('Error Occurred: ' + error);
                console.log('Error Occurred: ', error)
            })
        );
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
        //if(this.props.delete ? this.props.delete)
        if (this.props.match.params.id === 'new') {
            return <NewRecord />;
        }
        else if (this.props.match.params.id) {
            return <EditRecord id={this.props.match.params.id} />;
        }
        else {
            //return this.renderList();

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
}

export default RecordList;
