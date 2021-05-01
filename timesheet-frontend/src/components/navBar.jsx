import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class NavBar extends Component {
  render() {
    const { account } = this.props;
    return (
      <nav className="navbar navbar-expant-lg navbar-light bg-light navbar-static-top">
        <div className="col-3">
          <NavLink className="navbar-brand" to="/">
            Home
          </NavLink>
        </div>
        <div className="col-9">
          <div className="navbar" id="navbarNav">
            <div className="nav navbar-nav">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
              {!account && (
                <React.Fragment>
                  <NavLink className="nav-item nav-link" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/register">
                    Register
                  </NavLink>
                </React.Fragment>
              )}
              {account && (
                <React.Fragment>
                  <NavLink className="nav-item nav-link" to="/classes">
                    Classes
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/logout">
                    Logout
                  </NavLink>
                </React.Fragment>
              )}
            </div>
            {account && (
              <span className="navbar-text">
                Welcome {`${account.username} !`}
              </span>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
