import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Ratings from 'react-ratings-declarative';

export const ProductRatingWidget = ({ rating, numberOfRatings }) => {
	return (
		<Box my={15}>
			<Ratings rating={rating} widgetDimensions="15px" widgetSpacings="2px" widgetRatedColors="teal">
				<Ratings.Widget />
				<Ratings.Widget />
				<Ratings.Widget />
				<Ratings.Widget />
				<Ratings.Widget />
			</Ratings>
			<Text size="xs">{numberOfRatings} reviews</Text>
		</Box>
	);
};
