import React from 'react';
import { NavBarMenuToggle as MenuToggle } from './navbar-menu-toggle';
import { NavBarLogo as Logo } from './navbar-logo';
import { NavBarContainer } from './navbar-container';
import { MenuStack } from './navbar-menu-stack';
import './../../assets/stylesheets/navbar.css';

// DOCUMENTATION
// https://raptis.wtf/blog/create-a-navbar-with-chakra-ui-react/

export const NavBar = (props) => {
	const [ isOpen, setIsOpen ] = React.useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<NavBarContainer {...props}>
			<Logo w="100px" />
			<MenuToggle toggle={toggle} isOpen={isOpen} />
			<MenuStack isOpen={isOpen} />
		</NavBarContainer>
	);
};
