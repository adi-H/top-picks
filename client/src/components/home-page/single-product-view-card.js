import React from 'react';
import { Link, Box, Spacer, Stack, Badge, Image, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import { SERVER_URL } from '../../variables/server-url';
import { Link as RouterLink } from 'react-router-dom';
import { SingleProductViewCardStyles } from '../../theme/pages/home';

// * DOCUMENTATION basic card component
// * https://www.geeksforgeeks.org/reactjs-chakra-ui-card-component/

export const SingleProductViewCard = (props) => {
	const cardBg = useColorModeValue(SingleProductViewCardStyles.bg.light, SingleProductViewCardStyles.bg.dark);

	console.log(props);
	return (
		<Box
			minW={SingleProductViewCardStyles.minW}
			m={5}
			rounded="20px"
			overflow="hidden"
			// bg={cardBg}
			borderWidth="1px"
			borderRadius="lg"
			// ? maybe add like opacity to the background so it can be whatever color u want ?
			// opacity="0.3"
			// _before={{
			// 	backgroundColor: cardBg
			// 	opacity: 0.9
			// }}
		>
			<Link as={RouterLink} to={`/product/id/${props.id}`}>
				<Image src={`${SERVER_URL}${props.imgPath}`} alt="product Image" />
				<Box p={5}>
					<Stack align="center">
						<Badge variant="solid" colorScheme="green" rounded="full" px={2}>
							{props.brand.name}
						</Badge>
					</Stack>
					<Stack align="center">
						<Text as="h2" fontWeight="normal" my={2}>
							{props.name}
						</Text>
						{/* <Text fontWeight="light">{props.description}</Text> */}
					</Stack>
					<Flex>
						<Spacer />
					</Flex>
				</Box>
			</Link>
		</Box>
	);
};
