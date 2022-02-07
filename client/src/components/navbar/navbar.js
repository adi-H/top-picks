import React from 'react';
import { NavBarMenuToggle as MenuToggle } from './navbar-menu-toggle';
import { NavBarLogo as Logo } from './navbar-logo';
import { NavBarContainer } from './navbar-container';
import { MenuStack } from './navbar-menu-stack';
import './../../assets/stylesheets/navbar.css';
import { useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

// DOCUMENTATION
// https://raptis.wtf/blog/create-a-navbar-with-chakra-ui-react/

export const NavBar = (props) => {
	const [ isOpen, setIsOpen ] = React.useState(false);
	const { colorMode, toggleColorMode } = useColorMode();

	const toggle = () => setIsOpen(!isOpen);

	return (
		<NavBarContainer {...props}>
			<Logo w="100px" />
			<Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
			<MenuToggle toggle={toggle} isOpen={isOpen} />
			<MenuStack isOpen={isOpen} />
		</NavBarContainer>
	);
};
