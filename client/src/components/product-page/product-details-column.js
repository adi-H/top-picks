import React from 'react';
import { Image, Text, Box, Skeleton, Heading } from '@chakra-ui/react';
import { SERVER_URL } from '../../variables/server-url';
import { ProductRatingWidget } from './product-rating-widget';
import { BestForTags } from './best-for-tags';
import { ProductBrandTag } from './product-brand-tag';

export const ProductDetailsColumn = ({ isLoading, imgUrl, rating, name, brand = {}, numOfRatings, tags = [] }) => {
	return (
		<Skeleton isLoaded={!isLoading}>
			{imgUrl ? (
				<Image src={`${SERVER_URL}${imgUrl}`} alt="product Image" w="100%" />
			) : (
				<Image src="" alt="loading" w="100%" />
			)}
			<ProductRatingWidget rating={rating} numOfRatings={numOfRatings} />
			<Heading size="md" m={2}>
				{name}
			</Heading>
			<Box m={3} mb={5}>
				<ProductBrandTag name={brand.name} id={brand.id} />
			</Box>
			<BestForTags tags={tags} />
		</Skeleton>
	);
};
