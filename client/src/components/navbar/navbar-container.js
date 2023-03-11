import { Flex } from '@chakra-ui/react';
import { navBarColor, titleDetails } from '../../theme/variables';

export const NavBarContainer = ({ children, ...props }) => {
	return (
		<Flex
			className="NavBarContainer"
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			w="100%"
			p={4}
			bg={navBarColor}
			// bg={[ 'gray', 'primary.500', 'transparent', 'transparent' ]}
			// color={[ 'white', 'white', 'primary.700', 'primary.700' ]}
			color={titleDetails.color}
			{...props}
		>
			{children}
		</Flex>
	);
};
