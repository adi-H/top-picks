import { genericRequest } from './generic-request';

import { SERVER_URL } from './../variables/server-url';

// login
export const login = async (email, password) => {
	const config = {
		baseUrl: SERVER_URL,
		endpoint: '/api/users/signin',
		method: 'POST',
		body: { email: email, password: password },
		options: { withCredentials: true }
	};
	try {
		const res = await genericRequest(config);
		// console.log(res);
		// return true;
		return res;
	} catch (e) {
		// console.log(e);
		// console.log('oh no :( try again');
		// return false;
		return e;
	}
};

// signup
export const signup = async (email, password) => {
	const config = {
		baseUrl: SERVER_URL,
		endpoint: '/api/users/signup',
		method: 'POST',
		body: { email: email, password: password },
		options: { withCredentials: true }
	};
	try {
		const res = await genericRequest(config);
		// console.log(res);
		// return true;
		return res;
	} catch (e) {
		// console.log('oh no :( try again');
		// return false;
		return e;
	}
};

// logout
export const logout = async () => {};

// check if user session info is ok
export const checkExistingCreds = async () => {
	const config = {
		baseUrl: SERVER_URL,
		endpoint: '/api/users/session-info',
		method: 'GET',
		options: { withCredentials: true }
	};
	try {
		const res = await genericRequest(config);
		// console.log(res);
		// return true;
		return res;
	} catch (e) {
		// console.log(e);
		// console.log('oh no :( try again');
		// return false;
		return e;
	}
};
