import { Box, Grid, GridItem, Heading, SimpleGrid, Skeleton, Input, Text, Spacer } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/use-fetch';
import { getProductsByBrand } from '../../services/products';
import { SearchByTag } from '../common/search-by-tag';
import { SmallProductCard } from './small-product-card';

export const MiscProducts = ({ brandId }) => {
	let [ isLoading, setIsLoading ] = useState(true);
	let [ products, setProducts ] = useState([]);
	let [ displayProducts, setDisplayProducts ] = useState([]);
	let [ search, setSearch ] = useState('');
	let [ searchedTags, setSearchedTags ] = useState([]);
	let conf = getProductsByBrand(brandId);
	let { status, data } = useFetch(conf);

	useEffect(
		() => {
			setProducts(data);
			setDisplayProducts(data);
			if (status === 'fetched') setIsLoading(false);
			console.log(data);
		},
		[ status, data ]
	);

	const handleSearchTextChange = (event) => setSearch(event.target.value);

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

	return (
		<Box m={4}>
			<Heading size="sm"> available products by the brand ~~ </Heading> <br />
			<Grid templateColumns="repeat(5, 1fr)">
				<GridItem>
					<Input
						p={3}
						size="md"
						variant="filled"
						placeholder="filter by name"
						value={search}
						onChange={handleSearchTextChange}
					/>

					<Box mt={4}>
						<SearchByTag
							current={searchedTags}
							setCurrent={setSearchedTags}
							directionArr={[ 'row', 'column' ]}
						/>
					</Box>
				</GridItem>

				<GridItem colSpan={4}>
					<Skeleton isLoaded={!isLoading}>
						<SimpleGrid columns={4}>
							{displayProducts
								.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
								.map((p) => (
									<SmallProductCard
										key={p.id}
										id={p.id}
										name={p.name}
										avgRating={p.avgRating}
										imgPath={p.imgPath}
									/>
								))}
						</SimpleGrid>
					</Skeleton>
				</GridItem>
			</Grid>
			<Heading size="sm" m={3}>
				total items ~~ {products.length}
			</Heading>
			<br />
		</Box>
	);
};
