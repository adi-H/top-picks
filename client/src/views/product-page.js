import { Box, GridItem, Heading, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetailsColumn } from '../components/product-page/product-details-column';
import { useFetch } from '../hooks/use-fetch';
import { getOneProductConf } from '../services/products';

export const ProductPage = (props) => {
	let { productId } = useParams();

	let [ isLoading, setIsLoading ] = useState(true);
	let [ product, setProduct ] = useState({});
	let conf = getOneProductConf(productId);
	let { status, data } = useFetch(conf);

	useEffect(
		() => {
			setProduct(data);
			if (status === 'fetched') setIsLoading(false);
		},
		[ status, data ]
	);

	return (
		<Box className="productPage" my={4}>
			<SimpleGrid columns={3} gap={5}>
				<GridItem columns={1}>
					<ProductDetailsColumn
						isLoading={isLoading}
						imgUrl={product.imgPath}
						rating={product.avgRating}
						name={product.name}
						brand={product.brand}
						numOfRatings={product.numOfRatings}
						tags={product.bestForTags}
					/>
				</GridItem>
				<GridItem colSpan={2}>
					<Heading>{productId}</Heading>
					<Skeleton isLoaded={!isLoading}>
						<Heading w="100%">{product.name}</Heading>
						<Text>{product.description}</Text>
					</Skeleton>
				</GridItem>
			</SimpleGrid>
		</Box>
	);
};
