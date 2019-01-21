import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink ,Redirect} from 'react-router-dom';
import routes from './college-routes';
import './colleges.css'

const defaultPage=()=>{
    return <p style={{padding:'30px'}}>Select one of the categories.</p>
}

class CollegeInfo extends Component {
    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <div className="college-page-container" style={{ display: "flex" }}>
                        <div
                            style={{
                                padding: "10px",
                                width: "200px",
                                background: "#f0f0f0"
                            }}>
                            <ul className="clg-names" style={{ listStyleType: "none", padding: '10px' }}>
                                <p><strong>Colleges</strong></p>
                                {routes.map((route, index) => (
                                    <li key={index}>
                                        <NavLink
                                            to={route.path}
                                            activeClassName="activeCollege">{route.name}
                                        </NavLink>
                                    </li>
                                ))// not defining key in li show warnings
                                }
                            </ul>
                        </div>
                        <Switch>
                            <Route exact path='/college-info/' component={defaultPage} />
                            <div style={{ flex: 1, padding: "20px" }}>
                                {
                                    routes.map((route, index) => (
                                        // Render more <Route>s with the same paths as
                                        // above, but different components this time.
                                        <Route
                                            key={index}
                                            path={route.path}
                                            exact={route.exact}
                                            component={route.main}
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

export default CollegeInfo;