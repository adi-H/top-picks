import React from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { NavBar } from '../components/navbar/navbar';
import { Outlet } from 'react-router-dom';
import { useColorModeValue } from '@chakra-ui/react';
import '../assets/stylesheets/main.css';
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
			<Grid templateColumns="repeat(6, 1fr)" gap={4} bg={appBg}>
				<GridItem colSpan={1} w="100%" />
				<GridItem colSpan={4} w="100%">
					<Box className="main-view-container" height="100vh" position="relative">
						<Outlet />
					</Box>
				</GridItem>
				<GridItem colSpan={1} w="100%" />
			</Grid>
		</div>
	);
};

export default Layout;
