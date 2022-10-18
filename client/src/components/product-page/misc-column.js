import React from 'react';
import { Box, Flex, Skeleton, Text } from '@chakra-ui/react';
import { VerboseProductInfo } from './verbose-product-info';
import { CommunityRatingsSection } from './users-ratings-section';

export const MiscProductColumn = ({ isLoading, productDesc, productId }) => {
	return (
		<Box>
			<Skeleton isLoaded={!isLoading}>
				<VerboseProductInfo description={productDesc} />
			</Skeleton>
			<CommunityRatingsSection productId={productId} />
		</Box>
	);
};
