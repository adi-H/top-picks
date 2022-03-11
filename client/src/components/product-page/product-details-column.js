import React from 'react';
import { Image, Text, Skeleton, Heading, Tag, TagLeftIcon } from '@chakra-ui/react';
import { SERVER_URL } from '../../variables/server-url';
import { ProductRatingWidget } from './product-rating-widget';
import { MdWorkOutline } from 'react-icons/md';

// DOCUMENTATION basic card component
// https://www.geeksforgeeks.org/reactjs-chakra-ui-card-component/

export const ProductDetailsColumn = ({ isLoading, imgUrl, rating, name, brand = {}, numOfRatings }) => {
	return (
		<Skeleton isLoaded={!isLoading}>
			<Text> this is the details col~~~</Text>
			{imgUrl ? (
				<Image src={`${SERVER_URL}${imgUrl}`} alt="product Image" w="100%" />
			) : (
				<Image src="" alt="loading" w="100%" />
			)}

			<ProductRatingWidget rating={rating} numOfRatings={numOfRatings} />

			<Heading size="md">{name}</Heading>
			<br />
			<Tag>
				<TagLeftIcon as={MdWorkOutline} boxSize="15px" />
				<Heading size="sm">{brand.name}</Heading>
			</Tag>
		</Skeleton>
	);
};
