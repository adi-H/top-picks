import { genericRequest } from './generic-request';

const server_url = 'http://20.82.37.12';

// login
export const login = async (email, password) => {
	const config = {
		baseUrl: server_url,
		endpoint: '/api/users/signin',
		method: 'POST',
		body: { email: email, password: password }
	};
	try {
		const res = await genericRequest(config);
		console.log(res);
		return true;
	} catch (e) {
		console.log(e);
		console.log('oh no :( try again');
		return false;
	}
};

// signup
export const signup = async (email, password) => {
	const config = {
		baseUrl: server_url,
		endpoint: '/api/users/signup',
		method: 'POST',
		body: { email: email, password: password }
	};
	try {
		const res = await genericRequest(config);
		console.log(res);
		return true;
	} catch (e) {
		console.log('oh no :( try again');
		return false;
	}
};

// logout
export const logout = async () => {};
