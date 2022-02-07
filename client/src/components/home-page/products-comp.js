import { Box, Grid, Text } from '@chakra-ui/react';
import { ProductCard } from './product-card';

export function ProductsComp({ list }) {
	return (
		<Box>
			<Text>here are all the products we can think of!!~</Text>
			<br />

			<Grid pr="8" pl="8" templateColumns="repeat(5, 1fr)" gap={3}>
				{list.length > 0 &&
					list.map((p) => {
						console.log('inside foreacg', p);
						return <ProductCard key={p.id} {...p} />;
					})}
			</Grid>
		</Box>
	);
}
