import { LocationAction } from '../types/reducer';
import { LocationState } from '../types/state';

export const initialState: LocationState = {
	location: {
		ipAddress: '192.212.174.101',
		location: 'Brooklyn, NY 10001',
		timezone: 'UTC -05:00',
		ISP: 'SpaceX Starlink'
	},
	error: null,
	loading: false,
	lastFetchDate: new Date()
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
		default:
			return state;
	}
};
