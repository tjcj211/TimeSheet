import http from './httpService';
import {mongoUrl} from '../config.json';

const mongoDB = mongoUrl + "accounts/register";

//Get a specific account given an accountId
function accountURL(id) {
	return `${mongoDB}/${id}`;
}

// GET account/:accountId
export function getAccount(accountId) {
	return http.get(accountURL(accountId));
}

export function register(account) {
	return http.post(mongoDB, {
		username: account.username,
		password: account.password,
		email: account.email
	});
}
