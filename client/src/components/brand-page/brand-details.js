import React from 'react';
import { Box, Skeleton, Heading, Accordion } from '@chakra-ui/react';
import { CustomAccordionTab } from '../common/custom-accordion-tab';
import { MdInfoOutline } from 'react-icons/md';

export const BrandDetails = ({ name, description, isLoading }) => {
	return (
		<Skeleton isLoaded={!isLoading}>
			<Box w="100%" textAlign="left">
				<Heading size="3xl" as="i" fontWeight="light">
					{name}
				</Heading>
			</Box>
			<Box w="100%" my={6}>
				<Accordion allowToggle textAlign="left">
					<CustomAccordionTab title="brand description" content={description} iconContent={MdInfoOutline} />
				</Accordion>
			</Box>
		</Skeleton>
	);
};
