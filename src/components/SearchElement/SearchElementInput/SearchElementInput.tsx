import React, { useState } from 'react';
import './SearchElementInput.css';

function SearchElementInput() {
	const [value, setValue] = useState('192.212.174.101');

	return (
		<input
			className="header__search_element__input"
			type="text"
			value={value}
			onChange={(ev) => setValue(ev.target.value)}
		/>
	);
}

export default SearchElementInput;
