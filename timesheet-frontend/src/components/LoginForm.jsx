import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../common/form";
import login from "../service/loginService";

class LoginForm extends Form {
  constructor(props) {
    super(props);
    console.log(this.props.account);
  }
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login.login(data.username, data.password);
      //login.loginWithJwt(response.headers["x-access-token"]);

      //const account = login.getCurrentAccount();
      console.log("login form user ID = " + this.props.account._id);

      window.location.href = "/classes";

      console.log("url" + window.location.href);

      console.log("Going to page");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
