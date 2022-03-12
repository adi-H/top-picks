import { Box, Container, GridItem, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import Ratings from 'react-ratings-declarative';
import { FaUserNinja } from 'react-icons/fa';

export const UserRating = ({ rating, user, description }) => {
	return (
		<Container m={10} textAlign="left">
			<SimpleGrid columns={5}>
				<GridItem colSpan={3}>
					{' '}
					<Text as="div">
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
					<Text>
						<Icon as={FaUserNinja} /> {user.email}
					</Text>
				</GridItem>
			</SimpleGrid>

			<Text>{description} 'desc goes here hehe'</Text>
		</Container>
	);
};
