import { Box, Text, SimpleGrid, Flex, Input, Spacer, Wrap, WrapItem, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { SearchByProductType } from './search-by-product-type';
import { SearchByTag } from './search-by-tag';

export function DisplaySearchFilterColumn({
	searchedText,
	handleSearchTextChange,
	currentSearchedForTags,
	setSearchedForTags,
	searchedByProductType,
	setSearchedByProductType,
	showInColumn = false,
	byBrandNameSearch = '',
	handleSearchByBrandName = undefined
}) {
	return (
		<Wrap>
			<WrapItem width={showInColumn ? '100%' : '25%'}>
				<Stack spacing={4}>
					<Input
						p={3}
						size="sm"
						variant="filled"
						placeholder="filter by name"
						value={searchedText}
						onChange={handleSearchTextChange}
					/>

					{handleSearchByBrandName != undefined && (
						<Input
							p={3}
							size="sm"
							variant="filled"
							placeholder="filter by brand"
							value={byBrandNameSearch}
							onChange={handleSearchByBrandName}
						/>
					)}
				</Stack>
			</WrapItem>
			<Spacer />
			<WrapItem width={showInColumn ? '100%' : '35%'}>
				<SearchByTag
					current={currentSearchedForTags}
					setCurrent={setSearchedForTags}
					showTitle={true}
					showInDiffLines={showInColumn}
				/>
			</WrapItem>
			<Spacer />
			<WrapItem width={showInColumn ? '100%' : '30%'}>
				<SearchByProductType
					current={searchedByProductType}
					setCurrent={setSearchedByProductType}
					showTitle={true}
					showInDiffLines={showInColumn}
				/>
			</WrapItem>
		</Wrap>
	);
}
