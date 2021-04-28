import React from 'react';
import Joi from 'joi-browser';
import Form from '../common/form';
import accountService from '../service/accountService';
import loginService from '../service/logService';

export class RegisterForm extends Form {
	state = {
		data: { username: '', password: '', name: '' },
		errors: {},
	};

	schema = {
		username: Joi.string().required().email().label('Username'),
		password: Joi.string().required().min(5).label('Password'),
		email: Joi.string().required().label('Email'),
	};

	submitForm = async () => {
		try {
			const response = await accountService(this.state.data);
			loginService.login(response.headers["x-access-token"]);
			window.location = '/login';
		} catch (error) {
			if (error.response && error.response.status === 400) {
				const errors = { ...this.state.errors};
				errors.username = error.response.data;
				this.setState({errors});
			}
		}
	};

	render() {
		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('email', 'Email')}
					{this.renderButton('Register')}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
