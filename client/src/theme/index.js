import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// one source of truth hehe
import { colors } from './variables';

// * DOCUMENTATION
// * https://stackoverflow.com/a/72922064 *
// * for the mode()(props) deciding the bg color according to the color Mode

// * DOCS
// * https://github.com/chakra-ui/chakra-ui/discussions/5093#discussioncomment-1652354

export const theme = extendTheme({
	fonts: {
		heading: 'Varela Round, sans-serif',
		body: 'Varela Round, sans-serif'
	},

	// colors: colors,

	components: {
		Text: {
			baseStyle: (props) => ({
				color: mode(colors.primaryFontColor.lightMode, colors.primaryFontColor.darkMode)(props)
			}),
			variants: {
				// used as <Text variant="secondary">
				secondary: (props) => ({
					color: mode(colors.secondaryFontColor.lightMode, colors.secondaryFontColor.darkMode)(props)
				})
			}
		}
	},

	styles: {
		global: (props) => ({
			body: {
				bg: mode(colors.appBg.light, colors.appBg.dark)(props),
				// bg: appBgVars.light,
				color: mode(colors.primaryFontColor.lightMode, colors.primaryFontColor.darkMode)(props)
			}
		})
	},

	config: {
		initialColorMode: 'light',
		useSystemColorMode: false
	}
});
