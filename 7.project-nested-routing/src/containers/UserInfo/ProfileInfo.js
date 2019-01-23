import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import profiles from './profile-routes';
import './profile-info.css';

class ProfileInfo extends Component {
    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <div className="profile-page-container">
                        <div
                            style={{
                                width: "1400px",
                                height:'40px',
                                margin: 'auto',

                            }}>
                            <ul className="profile-depts" style={{ listStyleType: "none", padding: '10px' }}>
                                <li>
                                    <NavLink
                                        to='/profile-info/home'
                                        activeClassName="activeCollege">Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/profile-info/admin'
                                        activeClassName="activeCollege">Administration
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/profile-info/comp'
                                        activeClassName="activeCollege">Computer
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/profile-info/ec'
                                        activeClassName="activeCollege">EC
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/profile-info/mech'
                                        activeClassName="activeCollege">Mechanical
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <Switch>
                            <div style={{ flex: 1, padding: "20px" }}>
                                {
                                    profiles.map((profile, index) => (
                                        // Render more <Route>s with the same paths as
                                        // above, but different components this time.
                                        <Route
                                            key={index}
                                            path={profile.path}
                                            exact={profile.exact}
                                            component={profile.component}
                                        />
                                    )
                                    )
                                }
                            </div>
                        </Switch>
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

export default ProfileInfo;