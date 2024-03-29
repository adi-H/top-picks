import { Box, Grid, GridItem, Heading, SimpleGrid, Skeleton } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/use-fetch';
import { getProductsByBrand } from '../../services/products';
import { SmallProductCard } from './small-product-card';
import { DisplaySearchFilterColumn } from '../common/filter-and-search-comps/display-search-filter-column';

export const MiscProducts = ({ brandId }) => {
	let [ isLoading, setIsLoading ] = useState(true);
	let [ products, setProducts ] = useState([]);
	let [ displayProducts, setDisplayProducts ] = useState([]);
	let conf = getProductsByBrand(brandId);
	let { status, data } = useFetch(conf);

	let [ searchText, setSearch ] = useState('');
	let [ searchedTags, setSearchedTags ] = useState([]);
	let [ byProductType, setByProductType ] = useState([]);

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
			let filtered = products;
			if (searchedTags.length > 0) {
				// ! for product - check if the product tags contain some of the searched tags
				filtered = filtered.filter((p) => p.bestForTags.some((s) => searchedTags.includes(s)));
			}
			if (byProductType.length > 0) {
				filtered = filtered.filter((p) => byProductType.includes(p.productType));
			}
			setDisplayProducts(filtered);
		},
		[ searchedTags, byProductType ]
	);

	return (
		<Box m={4}>
			<Heading size="sm"> available products by the brand ~~ </Heading> <br />
			<Grid templateColumns="repeat(5, 1fr)">
				<GridItem>
					<DisplaySearchFilterColumn
						searchedText={searchText}
						handleSearchTextChange={handleSearchTextChange}
						currentSearchedForTags={searchedTags}
						setSearchedForTags={setSearchedTags}
						searchedByProductType={byProductType}
						setSearchedByProductType={setByProductType}
						showInColumn={true}
						handleSearchByBrandName={undefined}
					/>
				</GridItem>

				<GridItem colSpan={4}>
					<Skeleton isLoaded={!isLoading}>
						<SimpleGrid columns={4}>
							{displayProducts
								.filter((p) => p.name.toLowerCase().includes(searchText.toLowerCase()))
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
