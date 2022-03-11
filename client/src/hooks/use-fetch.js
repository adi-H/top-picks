import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

// DOCUMENTATION -- modified from https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/

export const useFetch = (conf) => {
	const cache = useRef({});
	const [ status, setStatus ] = useState('idle');
	const [ data, setData ] = useState([]);

	useEffect(
		() => {
			if (!conf.url) return;
			const fetchData = async () => {
				setStatus('fetching');
				if (cache.current[conf.url]) {
					const data = cache.current[conf.url];
					setData(data);
					setStatus('fetched');
				} else {
					const { url, method = 'GET', body = {}, otherOptions = {} } = conf;

					const options = {
						url: url,
						method: method,
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json;charset=UTF-8'
						},
						data: body,
						options: otherOptions
					};

					const response = await axios(options);
					const data = response.data;
					// const data = await response.json();
					cache.current[url] = data; // set response in cache;
					setData(data);
					setStatus('fetched');
				}
			};

			fetchData();
		},
		[ conf.url ]
	);

	return { status, data };
};
