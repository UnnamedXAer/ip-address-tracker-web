import React from 'react';
import './SearchElement.css';
import SearchElementButton from './SearchElementButton/SearchElementButton';
import SearchElementInput from './SearchElementInput/SearchElementInput';

function SearchElement() {
	return (
		<div className="header__search-element">
			<SearchElementInput />
			<SearchElementButton />
		</div>
	);
}

export default SearchElement;
