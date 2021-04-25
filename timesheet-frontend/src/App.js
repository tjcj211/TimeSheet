import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import About from './components/About';
import NotFound from './components/NotFound';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ClassesTable from './components/ClassesTable';
import LessonsTable from './components/LessonsTable';
import Home from './components/Home';

function App() {
	return (
		<div className="container">
			<Switch>
				<Route path="/login" component={LoginForm}></Route>
				<Route path="/register" component={RegisterForm}></Route>
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
	);
}

export default App;
