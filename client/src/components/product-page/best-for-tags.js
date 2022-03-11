import React from 'react';
import { Box, Tag, TagLeftIcon, Text } from '@chakra-ui/react';
import { BEST_FOR_TAGS_ICONS } from '../../variables/best-for-tags-icons';

const SkinTag = ({ label }) => {
	return (
		<Tag m={1} colorScheme="teal" variant="outline">
			<Text>{label} </Text>
			<TagLeftIcon boxSize="10px" mx={2} as={BEST_FOR_TAGS_ICONS[label]} />
		</Tag>
	);
};

export const BestForTags = ({ tags }) => {
	// console.log(tags);
	return (
		<Box>
			<Text size="sm" as="u" m={2} pb={3}>
				great for:
			</Text>
			{tags.length > 0 &&
				tags.map((label) => {
					return <SkinTag key={`${label}-bestfortag`} label={label} />;
				})}
		</Box>
	);
};
