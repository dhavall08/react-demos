import React, { Component } from 'react';

class ProfileName extends Component {
    
    render() {
        return (
            <div>
                Your Profile Id: {this.props.match.params.pid}
            </div>
        );
    }
}

export default ProfileName;