import { LocationInfo, StateError } from './state';

export type ReducerAction<T, P> = { type: T; payload: P };

export type LocationAction =
	| ReducerAction<'FETCH_LOCATION_SUCCESS', LocationInfo>
	| ReducerAction<'FETCH_LOCATION_START', undefined>
	| ReducerAction<'FETCH_LOCATION_FAIL', string>
	| ReducerAction<'SET_ERROR', StateError>;
