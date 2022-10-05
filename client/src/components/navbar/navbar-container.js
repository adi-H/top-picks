import { Flex } from '@chakra-ui/react';

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
			bg="#495464"
			// bg={[ 'gray', 'primary.500', 'transparent', 'transparent' ]}
			// color={[ 'white', 'white', 'primary.700', 'primary.700' ]}
			color="black"
			{...props}
		>
			{children}
		</Flex>
	);
};
