import React from 'react';
import { Box, Spacer, Stack, Button, Badge, Image, Text, Flex } from '@chakra-ui/react';
import { SERVER_URL } from '../../variables/server-url';
// DOCUMENTATION basic card component
// https://www.geeksforgeeks.org/reactjs-chakra-ui-card-component/
export const ProductCard = (props) => {
	console.log(props);
	// return <div> {props.name} card </div>;
	return (
		<Box w="200px" rounded="20px" overflow="hidden" bg={'gray.200'}>
			<Image
				// src="https://media.geeksforgeeks.org/wp-content/uploads/20210727094649/img1.jpg"
				src={`${SERVER_URL}/api/products/img/${props.productImg}`}
				alt="product Image"
				// boxSize="300px"
			/>
			<Box p={5}>
				<Stack align="center">
					<Badge variant="solid" colorScheme="green" rounded="full" px={2}>
						{props.brand}
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
					{/* <Button variant="solid" colorScheme="green" size="sm">
						Learn More
					</Button> */}
				</Flex>
			</Box>
			{/* {props.name} */}
		</Box>
	);
};
