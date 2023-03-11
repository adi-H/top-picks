import React, { useState } from 'react';
import {
	Box,
	Flex,
	Skeleton,
	Text,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalBody,
	ModalHeader,
	ModalFooter
} from '@chakra-ui/react';
import { UserRating } from '../common/user-rating/user-rating';

export const ModifyRatingModal = ({ isOpen, onClose, rating, submitEdit }) => {
	let [ newRating, setNewRating ] = useState(-2);
	let [ newDesc, setNewDesc ] = useState('');

	const getCurrentRating = () => {
		if (newRating == -2) return parseInt(rating.rating);
		return parseInt(newRating);
	};

	const getCurrentDesc = () => {
		if (newDesc == '') return rating.description;
		return newDesc;
	};

	const handleRatingChange = (value) => {
		setNewRating(value);
	};
	const handleDescChange = (e) => {
		setNewDesc(e.target.value);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>modify your review</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<UserRating
						rating={getCurrentRating()}
						user={rating.user}
						description={getCurrentDesc()}
						editable={true}
						handleRatingChange={handleRatingChange}
						handleDescChange={handleDescChange}
					/>
				</ModalBody>

				<ModalFooter>
					<Button
						colorScheme="blue"
						mr={3}
						onClick={() => {
							submitEdit(newRating, newDesc);
							onClose();
						}}
					>
						save changes
					</Button>
					<Button variant="ghost" onClick={onClose}>
						discard
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
