import { Flex } from '@chakra-ui/react';
export const NavBarContainer = ({ children, ...props }) => {
	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			w="100%"
			// mb={8}
			p={8}
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
