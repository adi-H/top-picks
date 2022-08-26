import React, { useEffect, useState } from 'react';
import { Box, Skeleton } from '@chakra-ui/react';
import { productRatingsConf } from '../../services/user-ratings';
import { useFetch } from '../../hooks/use-fetch';
import { UserRating } from './user-rating';
import { getUserDetails } from '../../services/user-auth';

export const CommunityRatingsSection = ({ productId }) => {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ ratings, setRatings ] = useState([]);
	const conf = productRatingsConf(productId);
	const { status, data } = useFetch(conf);
	let [ userDetails, setUserDetails ] = useState({});

	useEffect(async () => {
		const res = await getUserDetails();
		if (res.valid) setUserDetails({ email: res.email, id: res.id });
		console.log('setting info ----', res);
	}, []);

	useEffect(
		() => {
			setRatings(data);
			if (status === 'fetched') setIsLoading(false);
			console.log(data);
		},
		[ data, status ]
	);

	return isLoading ? (
		<Skeleton h="60px"> </Skeleton>
	) : (
		<Box>
			{' '}
			here's what other users say~~
			{ratings.map((r) => <UserRating key={r.id} {...r} />)}
		</Box>
	);
};
