import { SERVER_URL } from './../variables/server-url';
import { genericRequest } from './generic-request';

export const ratingCountConf = (id) => {
	return {
		url: `${SERVER_URL}/api/user-ratings/product/count/${id}`,
		method: 'GET'
	};
};

export const productRatingsConf = (id) => {
	return {
		url: `${SERVER_URL}/api/user-ratings/product/${id}`,
		method: 'GET'
	};
};

const getUserRatingForSpecificProductConf = (productId, userId) => {
	return {
		url: `${SERVER_URL}/api/user-ratings/product/${productId}/user/${userId}`,
		method: 'GET'
	};
};

export const getUserRatingForSpecificProduct = async (productId, userId) => {
	const config = getUserRatingForSpecificProductConf(productId, userId);
	try {
		const res = await genericRequest(config);
		return res;
	} catch (e) {
		return e;
	}
};
