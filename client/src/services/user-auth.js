import { genericRequest } from './generic-request';

const server_url = 'https://20.82.37.12';
// const server_url = 'https://ingress-nginx-controller.ingress-nginx.svc.cluster.local/';

// login
export const login = async (email, password) => {
	const config = {
		baseUrl: server_url,
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
		baseUrl: server_url,
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
