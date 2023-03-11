import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { titleDetails } from '../../theme/variables';

export const NavBarLogo = (props) => {
	return (
		<Box {...props}>
			<Link as={RouterLink} to="/" className="NavbarLogo">
				<Text
					fontSize={titleDetails.fontSize}
					color={titleDetails.color}
					fontFamily={titleDetails.fontFamily}
					fontWeight={titleDetails.fontWeight}
				>
					toppicks
				</Text>
			</Link>
		</Box>
	);
};
