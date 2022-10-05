import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// one source of truth hehe
import { appBgVars } from './variables';

// * DOCUMENTATION
// * https://stackoverflow.com/a/72922064 *
// * for the mode()(props) deciding the bg color according to the color Mode

export const theme = extendTheme({
	fonts: {
		heading: 'Noto Sans, sans-serif',
		body: 'Noto Sans, sans-serif'
	},
	styles: {
		global: (props) => ({
			body: {
				bg: mode(appBgVars.light, appBgVars.dark)(props)
			}
		})
	},
	config: {
		initialColorMode: 'light',
		useSystemColorMode: false
	}
});
