import { Component } from "react";
import login from "../service/loginService";
class Logout extends Component {
  componentDidMount() {
    login.logout();
    //window.location = "/";
    window.location.href = "http://localhost:3000";
  }

  render() {
    return null;
  }
}

export default Logout;
