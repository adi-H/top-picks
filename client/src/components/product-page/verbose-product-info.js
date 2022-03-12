import React from 'react';
import { Accordion, Box } from '@chakra-ui/react';
import { CustomAccordionTab } from '../common/custom-accordion-tab';

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
