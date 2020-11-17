import React from 'react';
import './Header.css';
import SearchElement from '../SearchElement/SearchElement';
import HeaderInfoBar from './HeaderInfoBar/HeaderInfoBar';

export default function Header() {
	return (
		<header className="header">
			<h1 className="header__app-title">IP Address Tracker</h1>
			<SearchElement />
			<HeaderInfoBar />
		</header>
	);
}
