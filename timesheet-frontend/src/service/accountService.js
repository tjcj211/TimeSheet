import http from './httpService';
const apiUrl = 'http://localhost:3001';

const apiEndpoint = apiUrl + '/account';

//Get a specific account given an accountId
function accountURL(accountId) {
	return `${apiEndpoint}/${id}`;
}

// GET account/
export function getAccount(accountId) {
	return http.get(accountURL(accountId));
}
