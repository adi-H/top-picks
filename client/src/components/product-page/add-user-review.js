import React, { useEffect, useState } from 'react';
import { useDisclosure, Flex, Button, Stack, StackItem, Text } from '@chakra-ui/react';
import { UserRating } from './../common/user-rating/user-rating';
import { ModifyRatingModal } from './modify-rating-modal';

export const AddUserReview = ({ productId, userId, isUserValid, rating }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const submitRating = (newRating, newDesc) => {
		console.log(newRating, newDesc);
		// TODO add submitting thro api here
	};

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

					<ModifyRatingModal isOpen={isOpen} onClose={onClose} rating={rating} submitEdit={submitRating} />
				</StackItem>
			</Stack>
		</Flex>
	) : (
		<Flex mb={3}>
			<Text> log in to add your own review!~~~ </Text>
		</Flex>
	);
};
