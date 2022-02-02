import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export const NavBarLogo = (props) => {
	return (
		<Box {...props}>
			<Text fontSize="lg" fontWeight="bold" color="black">
				Toppicks
			</Text>
		</Box>
	);
};
