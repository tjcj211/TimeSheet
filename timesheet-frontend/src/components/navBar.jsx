import React, { Component } from React;
import { NavLink } from "react-router-dom";
class NavBar extends Component {
    render(){
        const { account } = this.props;
        return (
            <nav className="navbar navbar-expant-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">
                    Home
                </NavLink>
                <button className = "navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle Navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav">
                        <NavLink to="/about" classname="nav-link">
                            About
                        </NavLink>
                        {!account && (
                            <React.Fragment>
                                <NavLink className="nav-item nav-link" to="/login">
                                    Login
                                </NavLink>
                            </React.Fragment>
                        )}
                    </div>

                </div>
            </nav>
        )
    }
   
    
}
 
export default NavBar;