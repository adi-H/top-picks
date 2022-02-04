import React from 'react';
import { NavBar } from '../components/navbar/navbar';
import { Outlet } from 'react-router-dom';
// DOCUMENTATION
// https://stackoverflow.com/a/69982280

const Layout = ({ children }) => {
	return (
		<div className="Layout">
			<div>
				<NavBar />
			</div>
			<div className="main-view-container">
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
