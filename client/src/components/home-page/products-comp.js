import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import { ProductCard } from './product-card';

export function ProductsComp({ list }) {
	return (
		<Box>
			<Text>here are some top rated products!! </Text>
			<br />

			<SimpleGrid gap={5} columns={3} minChildWidth="150px">
				{list.length > 0 &&
					list.map((p) => {
						// console.log('inside foreacg', p);
						return <ProductCard key={p.id} {...p} />;
					})}
			</SimpleGrid>
		</Box>
	);
}
