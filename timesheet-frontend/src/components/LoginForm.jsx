import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from '../common/form';
import {Redirect} from "react-router-dom";
import loginService from "../service/logService";

export class LoginForm extends Form {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		//this.logIn = new logService();
	}
	state = {
		data: { username: '', password: '' },
		errors: {},
	};

	schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().label('Password'),
	};

	doSubmit = async () => {
		 try {
			const {data} = this.state;
			await loginService(data.username, data.password);
			const {state} = this.props.location;
			window.location = state ? state.from.pathname : '/ClassesTable';
		} catch (error) {
			if (error.response && error.response.status === 400) {
				const errors = { ...this.state.errors};
				errors.username = error.response.data;
				this.setState({errors});
			} 
		}
	};

	render() {

 		if (loginService.getCurrentAccount()) {
			return <Redirect to="/login" />;
		}; 

		return (
			<div>
				<h1>Login</h1>
 				<form onSubmit={this.handleSubmit}>
				 <div className="username">
					{this.renderInput('username', 'Username')}
					</div>
					<div className="password">
					{this.renderInput('password', 'Password', 'password')}
					{this.renderButton('Login')}
					&nbsp;
					&nbsp;
					{this.renderButton('Register')}

					</div>
				</form>
			</div>
		);
	};
}

export default LoginForm;
