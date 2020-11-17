export type StateError = string | null;

export type LocationInfo = {
	ipAddress: string;
	location: string;
	timezone: string;
	ISP: string;
};

export type LocationState = {
	location: LocationInfo | null;
	error: StateError;
	loading: boolean;
	lastFetchDate: Date | null;
};
