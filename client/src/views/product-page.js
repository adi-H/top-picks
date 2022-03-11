import { Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { ProductsComp } from '../components/home-page/products-comp';
// import { getAllProducts } from './../services/products';

export const ProductPage = (props) => {
	let { productId } = useParams();

	// let [ products, setProducts ] = useState([]);
	// useEffect(() => {
	// 	getAllProducts()
	// 		.then((res) => {
	// 			setProducts([ ...res.data ]);
	// 		})
	// 		.then(() => {
	// 		});
	// }, []);

	return (
		<div>
			<h1>helooooo</h1>
			{/* <h1>hiiiii</h1>
			<h1>hiiiii</h1>
			<h1>hiiiii</h1>
			<h1>hiiiii</h1>
			<h1>hiiiii</h1>
			<h1>hiiiii</h1>
			<h1>hiiiii</h1>
			<h1>hiiiii</h1> */}
			<br />

			<Heading>{productId}</Heading>
		</div>
	);
};
