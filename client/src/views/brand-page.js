import { Box, GridItem, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MiscProductColumn } from '../components/product-page/misc-column';
import { ProductDetailsColumn } from '../components/product-page/product-details-column';
import { useFetch } from '../hooks/use-fetch';
import { getOneProductConf } from '../services/products';

export const BrandPage = () => {
	let { brandId } = useParams();

	// let [ isLoading, setIsLoading ] = useState(true);
	// let [ product, setProduct ] = useState({});
	// let conf = getOneProductConf(productId);
	// let { status, data } = useFetch(conf);

	// useEffect(
	// 	() => {
	// 		setProduct(data);
	// 		if (status === 'fetched') setIsLoading(false);
	// 	},
	// 	[ status, data ]
	// );

	return (
		<Box className="brandPage" my={4}>
			{brandId}
			{/* <SimpleGrid columns={3} gap={5}>
				<GridItem columns={1}>
					<ProductDetailsColumn
						isLoading={isLoading}
						imgUrl={product.imgPath}
						rating={product.avgRating}
						name={product.name}
						brand={product.brand}
						numOfRatings={product.numberOfRatings}
						tags={product.bestForTags}
					/>
				</GridItem>
				<GridItem colSpan={2} textAlign="left">
					<MiscProductColumn isLoading={isLoading} productDesc={product.description} productId={productId} />
				</GridItem>
			</SimpleGrid> */}
		</Box>
	);
};
