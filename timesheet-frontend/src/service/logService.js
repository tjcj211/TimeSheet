import decode from 'jwt-decode';

/* function init() {}

function log(error) {
	console.log(error);
} */

export default class logService {
	constructor(domain) {
		this.domain = 'http://localhost:3000';
		this.fetch = this.fetch.bind(this);
		this.LoginForm = this.LoginForm.bind(this);
		this.getUser = this.getUser.bind(this);
	}

	login(username, password) {
		return this.fetch(`${this.domain}/login`, {
			method: 'POST',
			body: JSON.stringify ({
				username,
				password,
			}),
		}).then(res => {
			this.setToken(res.token);
			return Promise.resolve(res);
		});
	}

	fetch(url, options) {
		const header = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		};

		if (this.logIn()) {
			header['Authorization'] = 'Bearer ' + this.getToken();
		}

		return fetch(url, {header, ...options, })
		.then(this.responseStatus)
		.then(response => response.json());
	}

	tokenExpiration(token) {
		try {
			const decoded = decode(token);
			if (decoded.exp < Date.now() / 1000) {
				return true;
			} else { return false; }

			} catch (error) {
				return false;
		}
	}

	saveToken(token) {
		localStorage.setItem('token-name', token);
	}

	getToken() {
		return localStorage.getItem('token-name');
	}

	logIn() {
		const token = this.getToken();
		return !this.tokenExpiration(token);
	}

	logout() {
		localStorage.removeItem('token-name');
	}

	getUser() {
		return decode(this.getToken());
	}

	responseStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			var error = new Error(response);
			throw error;
		}
	}

}
