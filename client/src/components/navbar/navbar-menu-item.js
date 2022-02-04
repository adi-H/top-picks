import React from 'react';
import { Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const MenuItem = ({ children, isLast, to = '/', ...rest }) => {
	return (
		<Link as={RouterLink} to={to} className="MenuItem">
			<Text display="block" {...rest}>
				{children}
			</Text>
		</Link>
	);
};
