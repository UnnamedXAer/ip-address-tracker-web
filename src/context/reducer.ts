import { LocationAction } from '../types/reducer';
import { LocationState } from '../types/state';

export const initialState: LocationState = {
	location: null,
	error: null,
	loading: false,
	lastFetchDate: null
};

export const reducer = (state: LocationState, action: LocationAction): LocationState => {
	switch (action.type) {
		case 'FETCH_LOCATION_START':
			return {
				...state,
				loading: true,
				error: null
			};
		case 'FETCH_LOCATION_SUCCESS':
			return {
				...state,
				loading: false,
				error: null,
				lastFetchDate: new Date(),
				location: action.payload
			};
		case 'FETCH_LOCATION_FAIL':
			return {
				...state,
				loading: false,
				error: action.payload,
				lastFetchDate: new Date(),
				location: null
			};
		case 'SET_ERROR':
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
