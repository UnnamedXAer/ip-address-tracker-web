import React from 'react';
import './Layout.css';
import Header from '../../components/Header/Header';
import Map from '../Map/Map';

function Layout() {
	return (
		<div className="layout">
			<Header />
			<Map />
		</div>
	);
}

export default Layout;
