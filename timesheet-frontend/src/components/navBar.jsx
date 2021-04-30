import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class NavBar extends Component {
  render() {
    const { account } = this.props;
    return (
      <nav className="navbar navbar-expant-lg navbar-light bg-light navbar-static-top">
        <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>

        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle Navigation"
          onClick="toggle-navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarNav">
          <div className="nav navbar-nav">
            <NavLink to="/about" classname="nav-link">
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
                  {account.username}
                </NavLink>
                <NavLink className="nav-item nav-link" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </div>
          {account && (
            <span className="navbar-text">
              Welcome {`${account.username} `}
            </span>
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
