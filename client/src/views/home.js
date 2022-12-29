import { Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MainProductsView } from '../components/home-page/main-products-view';

export const Home = ({ props }) => {
	return (
		<div>
			<h1>hiiiii</h1>
			<br />

			<MainProductsView />

			<Heading>hehe some more text here ~~ still home page</Heading>
		</div>
	);
};
