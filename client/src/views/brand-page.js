import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BrandDetails } from '../components/brand-page/brand-details';
import { MiscProducts } from '../components/brand-page/misc-products';
import { useFetch } from '../hooks/use-fetch';
import { getBrandInfoConf } from '../services/brands';

export const BrandPage = () => {
	let { brandId } = useParams();

	let [ brand, setBrand ] = useState({});
	let [ isLoading, setIsLoading ] = useState(true);
	let conf = getBrandInfoConf(brandId);
	let { status, data } = useFetch(conf);

	useEffect(
		() => {
			setBrand(data);
			if (status === 'fetched') setIsLoading(false);
			console.log(data);
		},
		[ status, data ]
	);

	return (
		<Box className="brandPage" my={4}>
			{/* {brandId} */}
			<BrandDetails name={brand.name} description={brand.description} isLoading={isLoading} />
			<MiscProducts brandId={brandId} />
		</Box>
	);
};
