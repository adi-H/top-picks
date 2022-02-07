import React, { useEffect, useState } from 'react';
import { ProductsComp } from '../components/home-page/products-comp';

import { getAllProducts } from './../services/products';

export const Home = ({ props }) => {
	let [ products, setProducts ] = useState([]);
	// let productsArr = <div />;
	useEffect(() => {
		// console.log(products);
		getAllProducts()
			.then((res) => {
				// console.log(res);
				setProducts([ ...res.data ]);
			})
			.then(() => {
				// let productsArr = products.forEach((p) => (
				// 	<div key={p.id} props={p}>
				// 		{' '}
				// 		{p.name}
				// 	</div>
				// ));
				// let productsArr = products.forEach((p) => <ProductCard key={p.id} props={p} />);
				// console.log(productsArr);
			});
	}, []);

	return (
		<div>
			<h1>hiiiii</h1>
			{/* <h1>hiiiii</h1>
			<h1>hiiiii</h1>
			<h1>hiiiii</h1>
			<h1>hiiiii</h1>
			<h1>hiiiii</h1>
			<h1>hiiiii</h1>
			<h1>hiiiii</h1>
			<h1>hiiiii</h1> */}
			<br />
			{/* {products.length > 0 &&
				products.forEach((p) => {
					console.log(p);
					return <ProductCard key={p.id} props={p} />;
				})} */}
			<ProductsComp list={products} />
		</div>
	);
};
