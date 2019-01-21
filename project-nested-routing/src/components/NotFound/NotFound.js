import React, { Component } from 'react';

class NotFound extends Component {
    render() {
        return (
            <React.Fragment>
                <h1 style={{ margin: 'auto', marginTop: "200px", width: '400px', fontSize: '30px', color: '#444' }}>
                    Aw, Snap! <br/>Error 404 :( <br /> Page Not Found!</h1>
            </React.Fragment>
        );
    }
}

export default NotFound;