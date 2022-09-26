import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const NavBarLogo = (props) => {
	return (
		<Box {...props}>
			<Link as={RouterLink} to="/" className="NavbarLogo">
				<Text fontSize="lg" fontWeight="bold" color="black">
					Toppicks
				</Text>
			</Link>
		</Box>
	);
};
