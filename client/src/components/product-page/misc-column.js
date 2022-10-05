import React from 'react';
import { Box, Flex, Skeleton, Text } from '@chakra-ui/react';
import { VerboseProductInfo } from './verbose-product-info';
import { CommunityRatingsSection } from './users-ratings-section';
import { AddUserReview } from './add-user-review';

export const MiscProductColumn = ({ isLoading, productDesc, productId }) => {
	return (
		<Box>
			<AddUserReview />
			<Skeleton isLoaded={!isLoading}>
				<VerboseProductInfo description={productDesc} />
			</Skeleton>
			<CommunityRatingsSection productId={productId} />
		</Box>
	);
};
