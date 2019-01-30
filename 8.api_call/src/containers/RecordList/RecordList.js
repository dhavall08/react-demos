import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './RecordList.css'

import { deleteSingleRecord, getUserList } from '../../apiCalls/apiCalls';

class RecordList extends Component {
  state = {
    loading: null,
    users: { data: [] },
    currentPage: 1,
    pagechange: false,
    error: false,
  }

  componentDidMount() {
    this.fetchUrl();
  }

  fetchUrl() {
    this.setState({ loading: true });
    getUserList(this.state.currentPage)
      .then(res => {
        if (!res.success) {
          this.setState({ loading: false, error: true });
          return;
        }
        else {
          this.setState({ users: res.data, loading: false, pagechange: false, error: false }, () => {
            console.log('[RecordList][UsersFetchURL]');
          });
        }
      })
  }
  pagesRender = (total_pages) => {
    return <div className="pagination">
      {Array(total_pages).fill().map((page, i) => {
        return <button
          key={i + 1}
          className={this.state.currentPage === i + 1 ? 'page pageselected' : 'page otherpages'}
          disabled={this.state.currentPage === i + 1 ? true : false}
          onClick={(e) => {this.paginationClickHandler(i + 1)}}>
          {i + 1}
        </button>
      })}
    </div>
  }

  deleteRecordClickHandler = (e, id) => {
    let y = window.confirm("Are you sure you want to delete this user?");
    console.log('[RecordList][Delete Value]', y);
    y && (deleteSingleRecord(id).then(res => {
      if (res.success) {
        console.log('[RecordList][Delete Action] Deletion Successful ')
        this.fetchUrl();
      }
      else {
        console.log('[RecordList][Delete Action] Error Occurred: ', res.error);
      }
    }))
  }

  paginationClickHandler(e,page) {
   // e.preventDefault(); not required because function callee doesn't return in arrow function
    (this.setState({ currentPage: page, pagechange: true }, () => {
      this.fetchUrl();
    }))

  }

  render() {
    const { loading, error, users, pagechange } = this.state;
    console.log("[RecordList] Render");
    return (
      <div className='recordList'>
        {
          loading || loading === null
            ? <p className='message'>Please wait while we are getting user details...</p> :
            (error ? <p className='message'>Something went wrong!</p> :
              <div>
                <div className='div-table'>
                  <div className='div-row heading-row'>
                    <div className="div-col heading-col"><strong>Firstname</strong></div>
                    <div className="div-col heading-col"><strong>Lastname</strong></div>
                    <div className="div-col heading-col"><strong>Avatar</strong></div>
                    <div className="div-col heading-col"><strong>Action</strong></div>
                  </div>
                  {//condition for empty table
                    console.log('[RecordList][Loading value]', loading)
                  }

                  {
                    loading || users.data.map((user, index) => (
                      <div key={index} className='div-row'>
                        <div className="div-col">{user.first_name}</div>
                        <div className="div-col">{user.last_name}</div>
                        <div className="div-col"><img alt="Profile" src={user.avatar} /></div>
                        <div className="div-col">
                          <NavLink className='actions' to={"/list/" + (user.id)}>Edit</NavLink><span> | </span>
                          <NavLink to='#' onClick={(e) => { this.deleteRecordClickHandler(e, user.id) }} className='actions' delete={(user.id)}>Delete</NavLink>
                        </div>
                      </div>
                    ))
                  
                  }
                </div>
                {this.pagesRender(users.total_pages)}
                {pagechange && <span className="fetching">Fetching data...</span>}
              </div>
            )}
      </div>
    );
  }
}

export default RecordList;
