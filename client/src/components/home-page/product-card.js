import React from 'react';
import { Box, Spacer, Stack, Badge, Image, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import { SERVER_URL } from '../../variables/server-url';

// DOCUMENTATION basic card component
// https://www.geeksforgeeks.org/reactjs-chakra-ui-card-component/

export const ProductCard = (props) => {
	const cardBg = useColorModeValue('gray.200', 'gray.600');

	console.log(props);
	return (
		<Box w="200px" m={7} rounded="20px" overflow="hidden" bg={cardBg}>
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
					<Text fontWeight="light">{props.description}</Text>
				</Stack>
				<Flex>
					<Spacer />
				</Flex>
			</Box>
		</Box>
	);
};
