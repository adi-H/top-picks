import React from 'react';
import { Box } from '@chakra-ui/react';
import { NavBar } from '../components/navbar/navbar';
import { Outlet } from 'react-router-dom';
import { useColorModeValue } from '@chakra-ui/react';

// DOCUMENTATION
// https://stackoverflow.com/a/69982280

// const appBg = useColorModeValue('#f4f4f2', '#1a202c');

const Layout = ({ children }) => {
	const appBg = useColorModeValue('#f4f4f2', '#1a202c');
	return (
		<div className="Layout">
			<div>
				<NavBar />
			</div>
			<Box className="main-view-container" bg={appBg} height="100vh" position="relative">
				<Outlet />
			</Box>
		</div>
	);
};

export default Layout;
