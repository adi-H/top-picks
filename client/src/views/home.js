import React, { useEffect, useState } from 'react';
import { MainProductsView } from '../components/home-page/main-products-view';
import { useFetch } from '../hooks/use-fetch';

import { getAllProductsConf } from './../services/products';

export const Home = ({ props }) => {
	let [ products, setProducts ] = useState([]);
	let config = getAllProductsConf();
	let { status, data } = useFetch(config);

	useEffect(
		() => {
			setProducts(data);
		},
		[ status, data ]
	);

	return (
		<div>
			<h1>hiiiii</h1>
			<br />

			{/* {products.length > 0 &&
				products.forEach((p) => {
					console.log(p);
					return <ProductCard key={p.id} props={p} />;
				})} */}
			<MainProductsView list={products} />
		</div>
	);
};
