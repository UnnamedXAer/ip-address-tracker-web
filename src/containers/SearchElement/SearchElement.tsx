import React, { useCallback, useContext, useEffect, useState } from 'react';
import './SearchElement.css';
import SearchElementButton from '../../components/SearchElement/SearchElementButton/SearchElementButton';
import SearchElementInput from '../../components/SearchElement/SearchElementInput/SearchElementInput';
import Dialog, { DialogData } from '../../components/UI/Dialog/Dialog';
import { LocationContext } from '../../context/locationContext';
import { fetchIPAddressLocation } from '../../utils/api';
import { isValidIPOrDomainAddress } from '../../utils/validation';
import Spinner from '../../components/UI/Spinner/Spinner';

function SearchElement() {
	const [IPValue, setIPValue] = useState('');
	const [dialogData, setDialogData] = useState<DialogData>({
		content: null,
		onClose: () => {},
		open: false,
		title: null
	});
	const { state: locationState, dispatch } = useContext(LocationContext);

	useEffect(() => {
		if (locationState.error) {
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
				const data = await fetchIPAddressLocation(address);
				dispatch({ type: 'FETCH_LOCATION_SUCCESS', payload: data });
			} catch (err) {
				dispatch({ type: 'FETCH_LOCATION_FAIL', payload: err.message });
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			if (locationState.location === null && locationState.lastFetchDate === null) {
				loadLocation();
			}
		}
	}, [loadLocation, locationState.lastFetchDate, locationState.location]);

	const submitHandler = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		if (!isValidIPOrDomainAddress(IPValue)) {
			return;
		}

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
			<Dialog data={dialogData} />
			<Spinner open={locationState.loading} />
		</>
	);
}

export default SearchElement;
