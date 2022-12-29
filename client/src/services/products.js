// import axios from 'axios';
import { genericRequest } from './generic-request';

import { SERVER_URL } from './../variables/server-url';

export const getAllProductsConf = () => {
	return {
		url: `${SERVER_URL}/api/products`,
		method: 'GET'
	};
};

export const getOneProductConf = (productId) => {
	return {
		url: `${SERVER_URL}/api/products/${productId}`,
		method: 'GET'
	};
};

export const getProductsByBrand = (brandId) => {
	return {
		url: `${SERVER_URL}/api/products/brand/${brandId}`,
		method: 'GET'
	};
};

export const getAllProducts = async () => {
	const config = getAllProductsConf();
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
