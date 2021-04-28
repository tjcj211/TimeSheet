import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from '../common/form';
<<<<<<< Updated upstream
//import logService from '../service/logService';
=======
import {Redirect} from "react-router-dom";
import loginService from "../service/logService";
>>>>>>> Stashed changes

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

	submitForm = async () => {
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

/* 	handleSubmit(error) {
		error.preventDefault();
		this.logIn.login(this.state.username, this.state.password)
		.then(res => {
			this.props.history.replace('/');
		})
		.catch(err => {
			alert(err);
		})
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	componentWillMount() {
		if(this.logIn.login()) {
			this.props.history.replace('/');
		}
	} */

	render() {

 		if (loginService.getCurrentAccount()) {
			return <Redirect to="/login" />;
		}; 

		return (
			<div>
				<h1>Login</h1>
 				<form onSubmit={this.handleSubmit}>
					{/*<input
					className="form-item"
					name="username"
					type="text"
					onChange={this.handleChange}/>
					<input
					className="form-item"
					name="password"
					type="password"
					onChange={this.handleChange}/>
					<input 
					className="form-submit"
					value="LOGIN"
					type="submit"
					/> */}
 					<div className="username">
					{this.renderInput('username', 'Username')}
					</div>
					<div className="password">
					{this.renderInput('password', 'Password', 'password')}
<<<<<<< Updated upstream
					</div>
					
					{this.renderButton('Login')} 
					&nbsp; 
					&nbsp;
					{this.renderButton('Register')} 
=======
					{this.renderButton('Login')}
					&nbsp;
					&nbsp;
					{this.renderButton('Register')}
>>>>>>> Stashed changes
				</form>
			</div>
		);
	};
}

export default LoginForm;
