import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { isUserLoggedIn } from '../../services/user-auth';

export const AddUserReview = ({}) => {
	const [ loggedIn, isLoggedIn ] = useState(false);

	useEffect(async () => {
		isLoggedIn(await isUserLoggedIn());
	}, []);

	// useEffect(
	// 	async () => {
	// 		console.log(loggedIn, 'value of loggedIn');
	// 	},
	// 	[ loggedIn ]
	// );

	return loggedIn ? (
		<Flex mb={3}>
			<Text> hehe logged in </Text>
		</Flex>
	) : (
		<Flex mb={3}>
			<Text> log in to add your own review!~~~ </Text>
		</Flex>
	);
};
