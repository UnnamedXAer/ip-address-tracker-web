import React, { createContext, Dispatch, useReducer } from 'react';
import { LocationAction } from '../types/reducer';
import { LocationState } from '../types/state';
import { initialState, reducer } from './reducer';

export const LocationContext = createContext<{
	state: LocationState;
	dispatch: Dispatch<LocationAction>;
}>({ state: initialState, dispatch: () => null });

const LocationContextProvider: React.FC = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<LocationContext.Provider value={{ state, dispatch }}>
			{props.children}
		</LocationContext.Provider>
	);
};

export default LocationContextProvider;
