import jwtDecode from 'jwt-decode';
import httpObj from './httpService';
import {mongoUrl} from '../config';

const mongoDB = mongoUrl + "accounts/";
const token = "token";

//http.setJwt(getJwt());

export async function login(username, password) {
	const {data: jwt} = await httpObj.post(mongoDB + "login", {
		username, password
	});

	localStorage.setItem(token, jwt);
}

export function tokenLogin(jwt) {
	localStorage.setItem(token, jwt);
}

export async function logout() {
	const response = await httpObj.get(mongoDB + "logout");
	console.log(response);
	localStorage.removeItem(token);
}

export function getCurrentAccount() {
	try {
		const jwt = localStorage.getItem(token);
		return jwtDecode(jwt);
	} catch (error) {
		return;
	}
};

export function getToken() {
	return localStorage.getItem(token);
}

export default {
	login,
	tokenLogin,
	logout,
	getCurrentAccount,
	getToken
};
