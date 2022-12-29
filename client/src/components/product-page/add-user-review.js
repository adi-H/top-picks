import React, { useEffect, useState } from 'react';
import { useDisclosure, Flex, Button, Stack, StackItem, Text } from '@chakra-ui/react';
import { UserRating } from './../common/user-rating/user-rating';
import { ModifyRatingModal } from './modify-rating-modal';

export const AddUserReview = ({ productId, userId, isUserValid, rating }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	// const [ isLoading, setIsLoading ] = useState(true);
	// const [ review, setReview ] = useState({});

	// useEffect(
	// 	async () => {
	// 		console.log(userId); // ! note this is 'nulluserId' if the userId is undefined in users-ratings-section
	// 		console.log(isUserValid);
	// 		console.log('RATING~~~~~~~', rating);
	// 	},
	// 	[ userId, isUserValid ]
	// );

	return isUserValid ? (
		<Flex mb={3}>
			<Stack>
				<StackItem>
					<Text> hehe logged in </Text>
					<Text> heres the review you left = </Text>
				</StackItem>
				<StackItem>
					<UserRating {...rating} />
				</StackItem>
				<StackItem>
					<Button onClick={onOpen}>Open Modal</Button>

					<ModifyRatingModal isOpen={isOpen} onClose={onClose} rating={rating} />
				</StackItem>
			</Stack>
		</Flex>
	) : (
		<Flex mb={3}>
			<Text> log in to add your own review!~~~ </Text>
		</Flex>
	);
};
