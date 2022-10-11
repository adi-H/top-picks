import React, { useEffect, useState } from 'react';
import { Box, Skeleton } from '@chakra-ui/react';
import { productRatingsConf } from '../../services/user-ratings';
import { useFetch } from '../../hooks/use-fetch';
import { UserRating } from './../common/user-rating/user-rating';
import { getUserDetails } from '../../services/user-auth';
import { AddUserReview } from './add-user-review';

export const CommunityRatingsSection = ({ productId }) => {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ ratings, setRatings ] = useState([]);
	const conf = productRatingsConf(productId);
	const { status, data } = useFetch(conf);
	let [ userData, setUserData ] = useState({});
	const [ thisUserRating, setThisUserRating ] = useState({});

	useEffect(async () => {
		const res = await getUserDetails();
		if (res.valid) setUserData(res);
		console.log('setting info ----', res);
	}, []);

	useEffect(
		() => {
			setRatings(data);
			if (status === 'fetched') setIsLoading(false);
			// console.log(data);
		},
		[ data, status ]
	);

	useEffect(
		() => {
			if (userData && userData.valid) {
				// console.log(ratings);
				const userRating = ratings.find((r) => {
					console.log(r);
					console.log(userData.id);
					console.log(r.user.id == userData.id);
					return r.user.id === userData.id;
				});
				setThisUserRating(userRating);
			}
		},
		[ ratings ]
	);

	return isLoading ? (
		<Skeleton h="60px"> </Skeleton>
	) : (
		<Box>
			<AddUserReview
				productId={productId}
				userId={userData.id}
				isUserValid={userData.valid}
				rating={thisUserRating}
			/>{' '}
			here's what other users say~~
			{ratings.map((r) => <UserRating key={r.id} {...r} />)}
		</Box>
	);
};
