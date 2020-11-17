import React from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import LocationContextProvider from './context/locationContext';

function App() {
	return (
		<div className="App">
			<LocationContextProvider>
				<Layout />
			</LocationContextProvider>
		</div>
	);
}

export default App;
