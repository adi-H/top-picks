import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import { SingleProductViewCard } from './single-product-view-card';
import { SingleProductViewCardStyles } from '../../theme/pages/home';
export function MainProductsView({ list }) {
	return (
		<Box>
			<Text>here are some top rated products we think might be dope for u ~~ </Text>
			<br />

			<SimpleGrid gap={1} columns={5} minChildWidth={SingleProductViewCardStyles.minW}>
				{list.length > 0 &&
					list.map((p) => {
						// console.log('inside foreacg', p);
						return <SingleProductViewCard minW={SingleProductViewCardStyles.minW} key={p.id} {...p} />;
					})}
			</SimpleGrid>
		</Box>
	);
}
