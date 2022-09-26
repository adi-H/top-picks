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
		return res;
	} catch (e) {
		return e;
	}
};

// TODO logout lmao
export const logout = async () => {};

const checkExistingCreds = async () => {
	const config = {
		baseUrl: SERVER_URL,
		endpoint: '/api/users/session-info',
		method: 'GET',
		options: { withCredentials: true }
	};
	try {
		const res = await genericRequest(config);
		return res;
	} catch (e) {
		return e;
	}
};

// check if user session info is ok, return true or false
export const isUserLoggedIn = async () => {
	const res = await checkExistingCreds();
	// console.log('checking creds!! ', res);
	if (res.data.sessionInfo !== null) return true;
	else return false;
};

// returns the user's email + makes sure the sessionInfo is ok
export const getUserDetails = async () => {
	const res = await checkExistingCreds();
	if (res.data.sessionInfo !== null) return { ...res.data.sessionInfo, valid: true };
	else return { valid: false };
};
