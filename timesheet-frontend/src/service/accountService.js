import http from './httpService';


const mongoDB =  'mongodb+srv://dbuser:9Sd-qaED-d-374Q@cluster0.c0anp.mongodb.net/timesheetDB?retryWrites=true&w=majority' + "accounts/";

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

export default {
	accountURL,
	getAccount,
	register
};