import React from 'react';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text, Icon } from '@chakra-ui/react';

export const CustomAccordionTab = ({ title, content, iconContent = undefined }) => {
	return (
		<AccordionItem>
			<AccordionButton>
				<Box flex="1" textAlign="left">
					{iconContent != undefined ? <Icon as={iconContent} /> : <Text> </Text>}
					<Text as="i"> {title}</Text>
				</Box>{' '}
				<AccordionIcon />
			</AccordionButton>

			<AccordionPanel p={3}>
				<Box fontSize="small" fontWeight="light">
					<Text>{content}</Text>
				</Box>
			</AccordionPanel>
		</AccordionItem>
	);
};
