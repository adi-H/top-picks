import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
// import { getUserDetails, isUserLoggedIn } from '../../services/user-auth';

export const AddUserReview = ({ productId, userId, isUserValid, rating }) => {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ review, setReview ] = useState({});

	// useEffect(async () => {
	// 	isLoggedIn(await isUserLoggedIn());
	// }, []);

	useEffect(
		async () => {
			console.log(userId); // ! note this is 'nulluserId' if the userId is undefined in users-ratings-section
			console.log(isUserValid);
			console.log('RATING~~~~~~~', rating);
			// 	console.log(loggedIn, 'value of loggedIn');
			// 	if (loggedIn) {
			// 	}
		},
		[ userId, isUserValid ]
	);

	// TODO to test this properly, figure out how to make like cookies save over localhost
	// TODO cant save session and cant id the user signed in rn

	return isUserValid ? (
		<Flex mb={3}>
			<Text> hehe logged in </Text>
		</Flex>
	) : (
		<Flex mb={3}>
			<Text> log in to add your own review!~~~ </Text>
		</Flex>
	);
};
