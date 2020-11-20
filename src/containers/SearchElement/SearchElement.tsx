import React, { useCallback, useContext, useEffect, useState } from 'react';
import SearchElementButton from '../../components/SearchElement/SearchElementButton/SearchElementButton';
import SearchElementInput from '../../components/SearchElement/SearchElementInput/SearchElementInput';
import Dialog, { DialogData } from '../../components/UI/Dialog/Dialog';
import { LocationContext } from '../../context/locationContext';
import { StateError } from '../../types/state';
import { fetchIPAddressLocation } from '../../utils/api';
import { isValidIPOrDomainAddress } from '../../utils/validation';
import './SearchElement.css';

function SearchElement() {
	const [IPValue, setIPValue] = useState('');
	const [error, setError] = useState<StateError>(null);
	const [dialogData, setDialogData] = useState<DialogData>({
		content: null,
		onClose: () => {},
		open: false,
		title: null
	});
	const { state: locationState, dispatch } = useContext(LocationContext);

	useEffect(() => {
		if (locationState.error) {
			console.log('locationState.error', locationState.error);
			setDialogData({
				open: true,
				title: 'Error',
				content: locationState.error,
				onClose: () => {
					setDialogData((prevState) => ({ ...prevState, open: false }));
					dispatch({ type: 'SET_ERROR', payload: null });
				}
			});
		}
	}, [dispatch, locationState.error]);

	const loadLocation = useCallback(
		async (address?: string) => {
			dispatch({ type: 'FETCH_LOCATION_START', payload: undefined });
			try {
				console.log('about to throw');
				const data = await fetchIPAddressLocation(address);
				dispatch({ type: 'FETCH_LOCATION_SUCCESS', payload: data });
			} catch (err) {
				dispatch({ type: 'FETCH_LOCATION_FAIL', payload: err.message });
			}
		},
		[dispatch]
	);

	useEffect(() => {
		// console.log('locationState.location', locationState.location);
		if (process.env.NODE_ENV === 'production') {
			if (locationState.location === null && locationState.lastFetchDate === null) {
				console.log('about to execute [loadLocation]');
				loadLocation();
			}
		}
	}, [loadLocation, locationState.lastFetchDate, locationState.location]);

	const submitHandler = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		if (!isValidIPOrDomainAddress(IPValue)) {
			return setError('Not an IP Address.');
		}

		setError(null);
		loadLocation(IPValue);
	};

	const IPChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setIPValue(ev.target.value);
	};

	return (
		<>
			<form className="header__search-element" onSubmit={submitHandler}>
				<SearchElementInput value={IPValue} onChange={IPChangeHandler} />
				<SearchElementButton />
			</form>
			{error && (
				<p
					style={{
						color: 'tomato',
						background: '#fff',
						opacity: 0.2,
						minWidth: 500,
						textAlign: 'center',
						fontWeight: 500,
						marginBlockStart: '0.1em'
					}}
				>
					{error}
				</p>
			)}
			<Dialog data={dialogData} />
		</>
	);
}

export default SearchElement;
