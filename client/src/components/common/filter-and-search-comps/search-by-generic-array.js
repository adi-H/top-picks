import React from 'react';
import { Box, Text, CheckboxGroup, Checkbox } from '@chakra-ui/react';

export const SearchByGenericArray = ({
	current,
	setCurrent,
	values,
	titleContent,
	showTitle = true,
	showInDiffLines = true
}) => {
	const onSelectionChange = (value) => {
		setCurrent(value);
	};

	return (
		<Box size="sm" textAlign="left">
			{showTitle && <Text decoration="underline"> {titleContent} </Text>}
			<CheckboxGroup colorScheme="teal" direction={[ 'row', 'column' ]} onChange={onSelectionChange}>
				{values.map((t) => {
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
