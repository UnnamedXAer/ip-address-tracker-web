import React from 'react';
import './SearchElementInput.css';

interface Props {
	value: string;
	onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchElementInput: React.FC<Props> = ({ value, onChange }) => {
	return (
		<input
			className="header__search_element__input"
			type="text"
			value={value}
			onChange={onChange}
		/>
	);
};

export default SearchElementInput;
