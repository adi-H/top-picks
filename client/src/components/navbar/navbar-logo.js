import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export function NavBarLogo(props) {
	return (
		<Box {...props}>
			<Text fontSize="lg" fontWeight="bold" color="black">
				Logo
			</Text>
		</Box>
	);
}
