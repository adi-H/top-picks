import React, { useEffect, useState } from 'react';
import { MenuItem } from './navbar-menu-item';
import { Box, Stack } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { isUserLoggedIn } from '../../services/user-auth';
import { useLocation } from 'react-router-dom';

export const MenuStack = ({ children, isOpen, ...rest }) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const [ loggedIn, isLoggedIn ] = useState(false);
	let location = useLocation();

	useEffect(
		async () => {
			isLoggedIn(await isUserLoggedIn());
		},
		[ location ]
	);

	return (
		<Box display={{ base: isOpen ? 'block' : 'none', md: 'block' }} flexBasis={{ base: '100%', md: 'auto' }}>
			<Stack
				spacing={5}
				align="center"
				justify={[ 'center', 'space-between', 'flex-end', 'flex-end' ]}
				direction={[ 'column', 'row', 'row', 'row' ]}
				pt={[ 3, 3, 0, 0 ]}
				fontSize={14}
			>
				<Button variant="ghost" onClick={toggleColorMode}>
					{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
				</Button>

				{/* TODO change links and all that~~ */}
				<MenuItem to="/">back home</MenuItem>
				{!loggedIn ? <MenuItem to="/login">login</MenuItem> : ''}
			</Stack>
		</Box>
	);
};
