import { Box, GridItem, Heading, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetailsColumn } from '../components/product-page/product-details-column';
import { useFetch } from '../hooks/use-fetch';
import { getOneProductConf } from '../services/products';
import { ratingCountConf } from '../services/user-ratings';

export const ProductPage = (props) => {
	let { productId } = useParams();

	let [ isLoading, setIsLoading ] = useState(true);
	let [ count, setCount ] = useState(0);
	let [ product, setProduct ] = useState({});
	let conf = getOneProductConf(productId);
	let { status, data } = useFetch(conf);

	let ratingsCountConf = ratingCountConf(productId);
	let { data: countData } = useFetch(ratingsCountConf);

	useEffect(
		() => {
			console.log(countData.count);
			setCount(countData.count);
		},
		[ countData ]
	);

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
						numOfRatings={count}
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
