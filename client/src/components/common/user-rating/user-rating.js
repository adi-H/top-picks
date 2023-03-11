import { Box, Container, GridItem, Icon, SimpleGrid, Spacer, Text, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import Ratings from 'react-ratings-declarative';
import { FaUserNinja } from 'react-icons/fa';

export const UserRating = ({
	rating,
	user,
	description,
	editable = false,
	handleRatingChange = undefined,
	handleDescChange = undefined
}) => {
	return (
		<Container p={4} m={3} textAlign="left" borderWidth="1px" borderRadius="lg">
			<SimpleGrid columns={5}>
				<GridItem colSpan={3}>
					{' '}
					<Text as="div" fontSize="sm">
						{rating}/5 {' '}
						<Ratings
							rating={rating}
							widgetDimensions="15px"
							widgetSpacings="2px"
							widgetRatedColors="teal"
							changeRating={editable ? handleRatingChange : undefined}
						>
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
			<Box p={2}>
				{editable ? (
					<Textarea value={description} onChange={handleDescChange} />
				) : (
					<Text>
						{description} desc goes here hehe -- my userid is {user.id}{' '}
					</Text>
				)}
			</Box>
		</Container>
	);
};
