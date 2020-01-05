import React, { Component } from 'react';
import './style.css'

class GridView extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div className="flex-grid">
        <div className="col">a</div>
        <div className="col">b</div>
        <div className="col">c</div>
      </div>
    );
  }
}

export default GridView;