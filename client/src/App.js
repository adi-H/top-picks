import './App.css';
import Layout from './layout/layout';
import { Route, Routes } from 'react-router-dom';
import { Home } from './views/home';

// import { createBrowserHistory } from 'history';
// const history = createBrowserHistory();
// DOCUMENTATION
// https://stackoverflow.com/a/69859510

const App = (props) => {
	return (
		<div className="App">
			{/* <Router location={history.location} navigator={history}> */}
			<Routes>
				<Route element={<Layout />}>
					{/* <Home /> */}
					<Route path="/" name="home" element={<Home />}>
						{' '}
					</Route>
					{/* <Route path="/" name="Home" render={(props) => <Layout {...props} />} /> */}
				</Route>
			</Routes>
			{/* </Router> */}
		</div>
	);
};

export default App;
