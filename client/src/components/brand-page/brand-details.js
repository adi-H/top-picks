import React from 'react';
import { Box, Text, Skeleton } from '@chakra-ui/react';

export const BrandDetails = ({ name, description, isLoading }) => {
	return (
		<Box className="brand-details-brand-page">
			<Skeleton isLoaded={!isLoading}>
				<Text>{name}</Text>
				<Text>{description}</Text>
			</Skeleton>
		</Box>
	);
};
