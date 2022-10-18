import { Box, Container, GridItem, Icon, SimpleGrid, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import Ratings from 'react-ratings-declarative';
import { FaUserNinja } from 'react-icons/fa';

export const UserRating = ({ rating, user, description }) => {
	return (
		<Container p={4} m={3} textAlign="left" borderWidth="1px" borderRadius="lg">
			<SimpleGrid columns={5}>
				<GridItem colSpan={3}>
					{' '}
					<Text as="div" fontSize="sm">
						{rating}/5 {' '}
						<Ratings rating={rating} widgetDimensions="15px" widgetSpacings="2px" widgetRatedColors="teal">
							<Ratings.Widget />
							<Ratings.Widget />
							<Ratings.Widget />
							<Ratings.Widget />
							<Ratings.Widget />
						</Ratings>
					</Text>
				</GridItem>
				<GridItem colSpan={2}>
					{' '}
					<Text fontSize="sm">
						<Icon as={FaUserNinja} /> {user.email}
					</Text>
				</GridItem>
			</SimpleGrid>
			<Text p={2}>
				{description} desc goes here hehe -- my userid is {user.id}{' '}
			</Text>
		</Container>
	);
};
