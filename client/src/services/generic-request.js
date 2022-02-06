import axios from 'axios';

export const genericRequest = async ({ baseUrl, endpoint, method, authRequired = false, body, otherOptions = {} }) => {
	try {
		// TODO add authRequired thingi and add cookie header to req
		const options = {
			url: `${baseUrl}${endpoint}`,
			method: method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8'
			},
			data: body,
			options: otherOptions
		};

		const response = await axios(options);
		console.log(response);
		return response;
	} catch (e) {
		console.log(e.response.data);
		return e.response;
	}
};
