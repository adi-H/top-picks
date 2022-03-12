import { Box, Grid, GridItem, Heading, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/use-fetch';
import { getProductsByBrand } from '../../services/products';
import { SmallProductCard } from './small-product-card';

export const MiscProducts = ({ brandId }) => {
	let [ isLoading, setIsLoading ] = useState(true);
	let [ products, setProducts ] = useState([]);
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

	return (
		<Box m={4}>
			<Heading size="sm"> available products by the brand ~~ </Heading>
			<Grid>
				<GridItem />
				<GridItem>
					<Skeleton isLoaded={!isLoading}>
						<SimpleGrid columns={4}>
							{products.map((p) => (
								<SmallProductCard
									key={p.id}
									name={p.name}
									avgRating={p.avgRating}
									imgPath={p.imgPath}
								/>
							))}
						</SimpleGrid>
					</Skeleton>
				</GridItem>
			</Grid>
		</Box>
	);
};
