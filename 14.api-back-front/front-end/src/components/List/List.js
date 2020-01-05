import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './List.css';
import Pdf from '../AddUser/Pdf';

class List extends Component {
  state = {
    users: [],
    loading: null,
    searchTerm: '',
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true })
    axios.get('http://192.168.1.207:8080/api/students/list').then((res) => {
      this.setState({ users: res.data.data, loading: false });
    }).catch(error => {
      this.setState({ loading: false })
      console.log(error);
    })
  }

  debounce(a, b, c) {
    var d, e;
    return function () {
      function h() {
        d = null
        c || (e = a.apply(f, g))
      }
      var f = this, g = arguments;
      return (clearTimeout(d),
        d = setTimeout(h, b),
        c && !d && (e = a.apply(f, g)), e)
    }
  }

  deleteHandler = (id) => {
    axios.delete('http://192.168.1.207:8080/api/students/delete/' + id)
      .then(res => {
        if (res.status === 200) {
          this.state.searchTerm !== '' ? this.searchHandler(this.state.searchTerm) : this.fetchData();
        }
      }).catch(error => {
        console.log(error);
      })
  }

  searchHandler = this.debounce((value, callback) => {
    axios.get('http://192.168.1.207:8080/api/students/list?search=' + value)
      .then(res => {
        this.setState({ users: res.data.data, loading: false });
      }).catch(error => {
        console.log(error);
      })
  }, 800);

  updateHandler = (id) => {
    this.props.history.push('/add/' + id);
  }

  render() {
    return (
      <React.Fragment>
        {

          <>
            <div className='col-sm-10 offset-sm-1'>
              <div className="add-user">
                <Link className="add-user-link" to="/add/">+ Add User</Link>
              </div>
              <table className="table table-responsive-sm table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email Address</th>
                    <th scope="col">Age</th>
                    <th scope="col">Mobile No.</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.loading
                      ? <tr>
                        <td colSpan='7' className='text-center'>Please wait while fetching data...</td>
                      </tr>
                      :
                      <>
                        <tr>
                          <td colSpan='7'>
                            <input
                              type='text'
                              value={this.state.searchTerm}
                              className='search-input'
                              placeholder='Search User here'
                              onChange={e => {
                                this.setState({ searchTerm: e.target.value });
                                this.searchHandler(e.target.value);
                              }} />
                          </td>
                        </tr>

                        {this.state.users.length === 0
                          ? <tr><td colSpan='7' className='text-center'>No record.</td></tr>
                          : this.state.users.map((val, i) => {
                            return (
                              <tr key={i}>
                                <td>{val.id}</td>
                                <td>{val.fname}</td>
                                <td>{val.lname}</td>
                                <td>{val.email}</td>
                                <td>{val.age}</td>
                                <td>{val.mobile}</td>
                                <td>
                                  <button type="button" className='btn btn-primary' onClick={() => { this.updateHandler(val.id) }}>Update</button>
                                  <button type="button" className='btn btn-danger ml-2' onClick={() => this.deleteHandler(val.id)}>Delete</button>
                                </td>
                              </tr>
                            )
                          })}
                      </>
                  }
                </tbody>
              </table>
            </div>
          </>
        }
<Pdf />
      </React.Fragment>
    );
  }
}

export default List;