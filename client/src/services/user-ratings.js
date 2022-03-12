import { SERVER_URL } from './../variables/server-url';

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
