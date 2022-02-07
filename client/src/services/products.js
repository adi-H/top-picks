import axios from 'axios';
import { genericRequest } from './generic-request';

import { SERVER_URL } from './../variables/server-url';

export const getAllProducts = async () => {
	const config = {
		baseUrl: SERVER_URL,
		endpoint: '/api/products',
		method: 'GET'
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
