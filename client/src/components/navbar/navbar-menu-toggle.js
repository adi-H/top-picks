import React from 'react';
import { Box } from '@chakra-ui/react';
import { CgClose, CgMenu } from 'react-icons/cg';

export const NavBarMenuToggle = ({ toggle, isOpen }) => {
	return (
		<Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
			{isOpen ? <CgClose /> : <CgMenu />}
		</Box>
	);
};
