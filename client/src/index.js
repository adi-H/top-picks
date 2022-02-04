import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

// DOCUMENTATION
// https://stackoverflow.com/a/70104127

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider>
			<BrowserRouter>
				<App />
				{/* <Routes>
					{/* <Route path="/*" element={<App />}>
						{' '}
					</Route> 
				</Routes> */}
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
