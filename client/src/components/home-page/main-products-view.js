import { Box, Text, Wrap } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { SingleProductViewCard } from './single-product-view-card';
import { SingleProductViewCardStyles } from '../../theme/pages/home';
import { useFetch } from '../../hooks/use-fetch';
import { getAllProductsConf } from './../../services/products';

import { DisplaySearchFilterColumn } from '../common/filter-and-search-comps/display-search-filter-column';

export function MainProductsView({}) {
	let [ products, setProducts ] = useState([]);
	let [ displayProducts, setDisplayProducts ] = useState([]);
	let config = getAllProductsConf();
	let { status, data } = useFetch(config);

	let [ searchText, setSearch ] = useState('');
	let [ searchedTags, setSearchedTags ] = useState([]);
	let [ byProductType, setByProductType ] = useState([]);
	let [ byBrandName, setByBrandName ] = useState('');

	useEffect(
		() => {
			setProducts(data);
			setDisplayProducts(data);
		},
		[ status, data ]
	);

	useEffect(
		() => {
			let filtered = products;
			if (searchedTags.length > 0) {
				// * for product - check if the product tags contain some of the searched tags
				filtered = filtered.filter((p) => p.bestForTags.some((s) => searchedTags.includes(s)));
			}
			if (byProductType.length > 0) {
				filtered = filtered.filter((p) => byProductType.includes(p.productType));
			}
			setDisplayProducts(filtered);
		},
		[ searchedTags, byProductType ]
	);

	const handleSearchTextChange = (event) => setSearch(event.target.value);

	const handleSearchByBrandName = (event) => setByBrandName(event.target.value);

	return (
		<Box>
			<Text>here are some top rated products we think might be dope for u ~~ </Text>
			<br />

			<DisplaySearchFilterColumn
				searchedText={searchText}
				handleSearchTextChange={handleSearchTextChange}
				currentSearchedForTags={searchedTags}
				setSearchedForTags={setSearchedTags}
				searchedByProductType={byProductType}
				setSearchedByProductType={setByProductType}
				showInColumn={false}
				byBrandNameSearch={byBrandName}
				handleSearchByBrandName={handleSearchByBrandName}
			/>

			<Wrap m={6} spacing="30px" justify="center" minChildWidth={SingleProductViewCardStyles.w}>
				{displayProducts.length > 0 &&
					displayProducts
						.filter((p) => p.name.toLowerCase().includes(searchText.toLowerCase()))
						.filter((p) => p.brand.name.toLowerCase().includes(byBrandName.toLowerCase()))
						.map((p) => {
							return <SingleProductViewCard w={SingleProductViewCardStyles.w} key={p.id} {...p} />;
						})}
			</Wrap>
		</Box>
	);
}
