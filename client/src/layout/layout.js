import React from 'react';
import { Box, Flex, Grid, GridItem, VStack } from '@chakra-ui/react';
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
		<VStack className="Layout" align="stretch" spacing={3}>
			<Flex position="relative" zIndex={8} top={0}>
				<NavBar />
			</Flex>
			<Box pt="70px">
				<Grid templateColumns="repeat(6, 1fr)" bg={appBg}>
					<GridItem colSpan={1} />
					<GridItem colSpan={4}>
						<Box className="main-view-container" position="relative">
							<Outlet />
						</Box>
					</GridItem>
					<GridItem colSpan={1} />
				</Grid>
			</Box>
		</VStack>
	);
};

export default Layout;
