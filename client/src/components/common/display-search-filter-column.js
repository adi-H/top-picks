import { Box, Text, SimpleGrid, Flex, Input, Spacer, Wrap, Grid, GridItem, WrapItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { SearchByProductType } from './search-by-product-type';
import { SearchByTag } from './search-by-tag';

export function DisplaySearchFilterColumn({
	searchedText,
	handleSearchTextChange,
	currentSearchedForTags,
	setSearchedForTags,
	searchedByProductType,
	setSearchedByProductType
}) {
	return (
		<Wrap>
			<WrapItem width="25%" height="100%">
				<Input
					p={3}
					size="sm"
					variant="filled"
					placeholder="filter by name"
					value={searchedText}
					onChange={handleSearchTextChange}
				/>
			</WrapItem>
			<Spacer />
			<WrapItem width="35%">
				<SearchByTag
					current={currentSearchedForTags}
					setCurrent={setSearchedForTags}
					showTitle={true}
					showInDiffLines={false}
				/>
			</WrapItem>
			<Spacer />
			<WrapItem width="30%">
				<SearchByProductType
					current={searchedByProductType}
					setCurrent={setSearchedByProductType}
					showTitle={true}
					showInDiffLines={false}
				/>
			</WrapItem>
		</Wrap>
	);
}
