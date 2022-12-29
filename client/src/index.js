import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// * DOCUMENTATION
// https://stackoverflow.com/a/70104127

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
