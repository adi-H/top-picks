import { Box, Grid, GridItem, Heading, SimpleGrid, Skeleton, Input } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/use-fetch';
import { getProductsByBrand } from '../../services/products';
import { SmallProductCard } from './small-product-card';

export const MiscProducts = ({ brandId }) => {
	let [ isLoading, setIsLoading ] = useState(true);
	let [ products, setProducts ] = useState([]);
	let [ search, setSearch ] = useState('');
	let conf = getProductsByBrand(brandId);
	let { status, data } = useFetch(conf);

	useEffect(
		() => {
			setProducts(data);
			if (status === 'fetched') setIsLoading(false);
			console.log(data);
		},
		[ status, data ]
	);

	const handleSearchTextChange = (event) => setSearch(event.target.value);

	// TODO add a normal search comp?? maybe generic enough so it can be reused ?
	return (
		<Box m={4}>
			<Heading size="sm"> available products by the brand ~~ </Heading> <br />
			<Grid templateColumns="repeat(5, 1fr)">
				<GridItem>
					search comp
					<Input
						size="md"
						variant="filled"
						placeholder="filter your products"
						value={search}
						onChange={handleSearchTextChange}
					/>
				</GridItem>
				<GridItem colSpan={4}>
					<Skeleton isLoaded={!isLoading}>
						<SimpleGrid columns={4}>
							{products
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
