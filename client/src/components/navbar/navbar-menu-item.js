import React from 'react';
import { Link, Text } from '@chakra-ui/react';

export const MenuItem = ({ children, isLast, to = '/', ...rest }) => {
	return (
		<Link href={to} className="MenuItem">
			<Text display="block" {...rest}>
				{children}
			</Text>
		</Link>
	);
};
