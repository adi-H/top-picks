import React from 'react';
import { MenuItem } from './navbar-menu-item';
import { Box, Stack } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

export const MenuStack = ({ children, isOpen, ...rest }) => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box display={{ base: isOpen ? 'block' : 'none', md: 'block' }} flexBasis={{ base: '100%', md: 'auto' }}>
			<Stack
				spacing={8}
				align="center"
				justify={[ 'center', 'space-between', 'flex-end', 'flex-end' ]}
				direction={[ 'column', 'row', 'row', 'row' ]}
				pt={[ 4, 4, 0, 0 ]}
			>
				<Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>

				{/* TODO change links and all that~~ */}
				<MenuItem to="/">random link</MenuItem>
				<MenuItem to="/login">login</MenuItem>
			</Stack>
		</Box>
	);
};
