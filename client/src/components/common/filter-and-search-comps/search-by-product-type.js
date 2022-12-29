import React from 'react';
import { Box, Text, CheckboxGroup, Checkbox } from '@chakra-ui/react';

import { possibleProductTypes } from '../../../variables/products-types';

export const SearchByProductType = ({ current, setCurrent, showTitle = true, showInDiffLines = true }) => {
	const onSelectionChange = (value) => {
		setCurrent(value);
	};

	return (
		<Box size="sm" textAlign="left">
			{showTitle && <Text decoration="underline"> filter by product type - </Text>}
			<CheckboxGroup colorScheme="teal" direction={[ 'row', 'column' ]} onChange={onSelectionChange}>
				{possibleProductTypes.map((t) => {
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
							<Checkbox key={t} p={1} size="sm" value={t}>
								{t}
							</Checkbox>
						);
					}
				})}
			</CheckboxGroup>
		</Box>
	);
};
