import { Box, GridItem, Heading, SimpleGrid, Image, Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/use-fetch';
import { getOneProductConf } from '../services/products';
import { SERVER_URL } from '../variables/server-url';

export const ProductPage = (props) => {
	let { productId } = useParams();

	let [ isLoading, setIsLoading ] = useState(true);
	let [ product, setProduct ] = useState({});
	let conf = getOneProductConf(productId);
	let { status, data } = useFetch(conf);

	useEffect(
		() => {
			setProduct(data);
			// console.log(data);
			if (status === 'fetched') setIsLoading(false);
		},
		[ status, data ]
	);

	return (
		<Box>
			<Heading>helooooo</Heading>
			<br />

			<SimpleGrid columns={3} gap={5}>
				<GridItem columns={1}>
					<Skeleton isLoaded={!isLoading}>
						{product.imgPath ? (
							<Image src={`${SERVER_URL}${product.imgPath}`} alt="product Image" w="100%" />
						) : (
							<Image src="" alt="loading" w="100%" />
						)}
					</Skeleton>
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
