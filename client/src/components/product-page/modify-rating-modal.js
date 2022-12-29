import React from 'react';
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

export const ModifyRatingModal = ({ isOpen, onClose, rating }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>modify your review</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<UserRating {...rating} editable={true} />
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={onClose}>
						save changes
					</Button>
					<Button variant="ghost">discard</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
