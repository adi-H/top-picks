import React from 'react';
import { Box, Text, CheckboxGroup, Checkbox } from '@chakra-ui/react';

import { BEST_FOR_TAGS_ICONS } from '../../variables/best-for-tags-icons';

export const SearchByTag = ({ current, setCurrent, showTitle = true, showInDiffLines = true }) => {
	const onSelectionChange = (value) => {
		setCurrent(value);
	};

	return (
		<Box size="sm" textAlign="left">
			{showTitle && <Text decoration="underline"> filter by concern - </Text>}
			<CheckboxGroup colorScheme="teal" direction={[ 'row', 'column' ]} onChange={onSelectionChange}>
				{Object.keys(BEST_FOR_TAGS_ICONS).map((t) => {
					if (showInDiffLines) {
						return (
							<Text key={t}>
								<Checkbox p={1} size="sm" value={t}>
									{t}
								</Checkbox>
							</Text>
						);
					} else {
						return (
							<Checkbox p={1} size="sm" value={t}>
								{t}
							</Checkbox>
						);
					}
				})}
			</CheckboxGroup>
		</Box>
	);
};
