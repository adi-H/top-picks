import { SERVER_URL } from './../variables/server-url';

export const getBrandInfoConf = (id) => {
	return {
		url: `${SERVER_URL}/api/brands/${id}`,
		method: 'GET'
	};
};
