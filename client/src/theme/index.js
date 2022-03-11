import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
	fonts: {
		heading: 'Noto Sans, sans-serif',
		body: 'Noto Sans, sans-serif'
	},
	config: {
		initialColorMode: 'light',
		useSystemColorMode: false
	}
});
