/*
 * Timothy Carta, Victoria Gorski, Julia Wilkinson
 */
import React from 'react';
import Joi from 'joi-browser';
import Form from '../common/form';
import { register } from '../service/registerService';

class RegisterForm extends Form {
	constructor(props) {
		super(props);
	}
	state = {
		data: { username: '', email: '', password: '', account_type: '' },
		errors: {},
	};

	schema = {
		username: Joi.string().alphanum().min(3).max(30).label('Username'),
		email: Joi.string().required().email().label('Email'),
		password: Joi.string().required().min(5).label('Password'),
		account_type: Joi.string().required().label('PROFESSOR/STUDENT'),
	};

	doSubmit = () => {
		console.log('do submit in registerform');
		try {
			const { data } = this.state;

			console.log('data: ' + data.username);
			register(
				data.username,
				data.email,
				data.password,
				data.account_type
			);
			//login.loginWithJwt(response.headers["x-access-token"]);

			//const account = login.getCurrentAccount();

			window.location.href = '/register';
			console.log('url' + window.location.href);

			console.log('Going to page');
		} catch (ex) {
			console.log('catching something in register');
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
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('email', 'Email')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('account_type', 'PROFESSOR/STUDENT')}
					{this.renderButton('Register')}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
