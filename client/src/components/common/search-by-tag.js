import React from 'react';
import { Box, Text, CheckboxGroup, Checkbox } from '@chakra-ui/react';

import { BEST_FOR_TAGS_ICONS } from '../../variables/best-for-tags-icons';

export const SearchByTag = ({ current, setCurrent }) => {
	const onSelectionChange = (value) => {
		setCurrent(value);
	};

	return (
		<Box mt={4} size="sm" textAlign="left">
			<Text decoration="underline"> filter by tag - </Text>
			<CheckboxGroup colorScheme="green" onChange={onSelectionChange}>
				{Object.keys(BEST_FOR_TAGS_ICONS).map((t) => (
					<Text>
						<Checkbox size="sm" value={t}>
							{t}
						</Checkbox>
					</Text>
				))}
			</CheckboxGroup>
		</Box>
	);
};
