import { Box, Text, SimpleGrid, Flex, Input, Spacer, Wrap, WrapItem, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { SearchByGenericArray } from './search-by-generic-array';

import { BEST_FOR_TAGS_ICONS } from '../../../variables/best-for-tags-icons';
import { possibleProductTypes } from '../../../variables/products-types';

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
				<SearchByGenericArray
					current={currentSearchedForTags}
					setCurrent={setSearchedForTags}
					titleContent="filter by concern - "
					values={Object.keys(BEST_FOR_TAGS_ICONS)}
					showTitle={true}
					showInDiffLines={showInColumn}
				/>
			</WrapItem>
			<Spacer />
			<WrapItem width={showInColumn ? '100%' : '30%'}>
				<SearchByGenericArray
					current={searchedByProductType}
					setCurrent={setSearchedByProductType}
					titleContent="filter by product type - "
					values={possibleProductTypes}
					showTitle={true}
					showInDiffLines={showInColumn}
				/>
			</WrapItem>
		</Wrap>
	);
}
