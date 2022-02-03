import React from 'react';
import { NavBar } from '../components/navbar/navbar';

const Layout = ({ children }) => {
	return (
		<div className="Layout">
			<div>
				<NavBar />
				{/* <ToolBar />
				<Sides />
				<Backdrop /> */}
			</div>
			<main>{children}</main>
		</div>
	);
};

export default Layout;
