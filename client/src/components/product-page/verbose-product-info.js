import React from 'react';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react';

const CustomAccordionTab = ({ title, content }) => {
	return (
		<AccordionItem>
			<AccordionButton>
				<Box flex="1" textAlign="left" fontSize="medium">
					<Text as="i">{title}</Text>
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

export const VerboseProductInfo = ({ description, ingridiants }) => {
	return (
		<Box w="100%" mb={5}>
			<Accordion allowToggle textAlign="left">
				<CustomAccordionTab title="description" content={description} />
				<CustomAccordionTab title="ingridiants" content={`${ingridiants} asdbasd asdk`} />
			</Accordion>
		</Box>
	);
};
