import React from 'react';
import { Heading, Tag, TagLeftIcon, useColorMode, Link } from '@chakra-ui/react';
import { MdWorkOutline } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';

export const ProductBrandTag = ({ name, id }) => {
	const { colorMode } = useColorMode();

	return colorMode === 'light' ? (
		<Heading size="sm">
			<Tag colorScheme="blackAlpha">
				{' '}
				<Link as={RouterLink} to={`/brand/id/${id}`}>
					<TagLeftIcon as={MdWorkOutline} boxSize="15px" />
					{name}
				</Link>
			</Tag>
		</Heading>
	) : (
		<Heading size="sm">
			<Tag colorScheme="gray">
				{' '}
				<Link as={RouterLink} to={`/brand/id/${id}`}>
					<TagLeftIcon as={MdWorkOutline} boxSize="15px" />
					{name}
				</Link>
			</Tag>
		</Heading>
	);
};
