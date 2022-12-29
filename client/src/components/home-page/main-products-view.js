import { Box, Text, SimpleGrid, Flex, Input, Spacer, Wrap, Grid, GridItem, WrapItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { SingleProductViewCard } from './single-product-view-card';
import { SingleProductViewCardStyles } from '../../theme/pages/home';
import { useFetch } from '../../hooks/use-fetch';
import { SearchByTag } from '../common/search-by-tag';
import { getAllProductsConf } from './../../services/products';

export function MainProductsView({}) {
	let [ products, setProducts ] = useState([]);
	let [ displayProducts, setDisplayProducts ] = useState([]);
	let config = getAllProductsConf();
	let { status, data } = useFetch(config);
	let [ search, setSearch ] = useState('');
	let [ searchedTags, setSearchedTags ] = useState([]);

	useEffect(
		() => {
			setProducts(data);
			setDisplayProducts(data);
		},
		[ status, data ]
	);
	useEffect(
		() => {
			if (searchedTags.length > 0) {
				// ! for product - check if the product tags contain some of the searched tags
				let filtered = products.filter((p) => p.bestForTags.some((s) => searchedTags.includes(s)));
				setDisplayProducts(filtered);
			} else {
				setDisplayProducts(products);
			}
		},
		[ searchedTags ]
	);

	const handleSearchTextChange = (event) => setSearch(event.target.value);

	return (
		<Box>
			<Text>here are some top rated products we think might be dope for u ~~ </Text>
			<br />
			{/* display search & filter part */}
			<Wrap>
				<WrapItem width="25%" height="100%">
					<Input
						p={3}
						size="sm"
						variant="filled"
						placeholder="filter by name"
						value={search}
						onChange={handleSearchTextChange}
					/>
				</WrapItem>
				<WrapItem width="10%">
					<Text as="i" fontSize="sm">
						filter by concern:
					</Text>
				</WrapItem>
				<Spacer />
				<WrapItem width="60%">
					<SearchByTag
						current={searchedTags}
						setCurrent={setSearchedTags}
						showTitle={false}
						showInDiffLines={false}
					/>
				</WrapItem>
			</Wrap>

			{/* products view */}
			<Wrap m={6} spacing="30px" justify="center" minChildWidth={SingleProductViewCardStyles.w}>
				{displayProducts.length > 0 &&
					displayProducts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())).map((p) => {
						return <SingleProductViewCard w={SingleProductViewCardStyles.w} key={p.id} {...p} />;
					})}
			</Wrap>
		</Box>
	);
}
