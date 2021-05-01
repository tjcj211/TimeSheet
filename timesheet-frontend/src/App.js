/*
 * Timothy Carta, Victoria Gorski, Julia Wilkinson
 */
import React from 'react';
import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import About from './components/About';
import NotFound from './components/NotFound';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ClassesTable from './components/ClassesTable';
import LessonsTable from './components/LessonsTable';
import Home from './components/Home';
import login from './service/loginService';
import Logout from './components/logout';
import NavBar from './components/navBar';
import LoginScreen from './components/LoginScreen';
class App extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		account: {},
	};
	componentDidMount() {
		const account = login.getCurrentAccount();
		this.setState({ account });
		console.log('App.js state = ' + account);
	}
	render() {
		const { account } = this.state;
		console.log('App.js state ' + account);

		return (
			<div className="container">
				<NavBar account={account} />
				<Switch>
					<Route
						exact
						path="/login"
						render={(props) => (
							<LoginForm account={account} {...props} />
						)}
					></Route>
					<Route exact path="/logout" component={Logout} />
					<Route
						exact
						path="/register"
						render={(props) => (
							<RegisterForm account={account} {...props} />
						)}
					></Route>
					<Route exact path="/about" component={About}></Route>
					<Route path="/not-found" component={NotFound}></Route>
					<Route
						exact
						//path="/:id/classes"
						path="/classes"
						render={(props) => (
							<ClassesTable account={account} {...props} />
						)}
					></Route>
					<Route
						exact
						path="/:id/classes/:classId"
						render={(props) => (
							<LessonsTable account={account} {...props} />
						)}
					></Route>
					<Route
						exact
						path="/"
						render={(props) => (
							<Home account={account} {...props} />
						)}
					></Route>
					<Redirect to="/not-found" />
				</Switch>
			</div>
		);
	}
}

export default App;
