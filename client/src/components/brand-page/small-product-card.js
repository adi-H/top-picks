import { Box, Container, Image, GridItem, Text } from '@chakra-ui/react';
import React from 'react';
import { SERVER_URL } from '../../variables/server-url';
import Ratings from 'react-ratings-declarative';

export const SmallProductCard = ({ name, imgPath, avgRating }) => {
	return (
		<GridItem colSpan={1}>
			<Container>
				{imgPath ? (
					<Image src={`${SERVER_URL}${imgPath}`} alt="product Image" w="100%" />
				) : (
					<Image src="" alt="loading" w="100%" />
				)}

				<Box w="100%" textAlign="left">
					<Text>{name}</Text>
				</Box>
				<Box w="100%" textAlign="right">
					<Text as="div">
						<Ratings
							rating={avgRating}
							widgetDimensions="12px"
							widgetSpacings="1px"
							widgetRatedColors="teal"
						>
							<Ratings.Widget />
							<Ratings.Widget />
							<Ratings.Widget />
							<Ratings.Widget />
							<Ratings.Widget />
						</Ratings>
					</Text>
				</Box>
			</Container>
		</GridItem>
	);
};
