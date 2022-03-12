import React from 'react';
import { Heading, Tag, TagLeftIcon, useColorMode } from '@chakra-ui/react';
import { MdWorkOutline } from 'react-icons/md';

export const ProductBrandTag = ({ name, id }) => {
	const { colorMode } = useColorMode();

	return colorMode === 'light' ? (
		<Tag colorScheme="blackAlpha">
			<TagLeftIcon as={MdWorkOutline} boxSize="15px" />
			<Heading size="sm">{name}</Heading>
		</Tag>
	) : (
		<Tag colorScheme="gray">
			<TagLeftIcon as={MdWorkOutline} boxSize="15px" />
			<Heading size="sm">{name}</Heading>
		</Tag>
	);
};
