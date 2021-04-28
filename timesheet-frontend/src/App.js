import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import About from './components/About';
import NotFound from './components/NotFound';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ClassesTable from './components/ClassesTable';
import LessonsTable from './components/LessonsTable';
import Logout from './components/Logout';
import Home from './components/Home';
import loginService from './service/logService';

class App extends Component {

	state = {};

	componentDidMount() {
		const account = loginService.getCurrentAccount();
		console.log(account);
		this.setState({ account });
	}
	render () {
		<div className="container">
			<Switch>
				<Route path="/login" component={LoginForm}></Route>
				<Route path="/register" component={RegisterForm}></Route>
				<Route path="/logout" component={Logout}></Route>
				<Route path="/about" component={About}></Route>
				<Route path="/not-found" component={NotFound}></Route>
				<Route
					path="/:id/classes"
					exact
					component={ClassesTable}
				></Route>
				<Route
					path="/:id/classes/:classId"
					exact
					component={LessonsTable}
				></Route>
				<Route path="/" exact component={Home}></Route>
				<Redirect to="/not-found" />
			</Switch>
		</div>
	};
}

export default App;
