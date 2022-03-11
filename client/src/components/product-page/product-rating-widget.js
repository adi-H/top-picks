import React from 'react';
import { Box, Text, Skeleton, useColorModeValue } from '@chakra-ui/react';
import Ratings from 'react-ratings-declarative';

export const ProductRatingWidget = ({ rating, numberOfRatings = 0 }) => {
	return (
		<Box my={15}>
			<Ratings rating={rating} widgetDimensions="15px" widgetSpacings="2px">
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
