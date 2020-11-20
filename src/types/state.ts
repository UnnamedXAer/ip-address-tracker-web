import { LatLngLiteral } from 'leaflet';

export type StateError = string | null;

export type LocationInfo = {
	search: {
		userInput: string;
		searchValue: string;
	};
	ipAddress: string;
	domain?: string;
	ISP: string;
	location: {
		country: string;
		region: string;
		city: string;
		latLng: LatLngLiteral;
		postalCode: string;
		timezone: string;
	};
};

export type LocationInfoError = {
	code: number;
	message: string;
	isError: true;
};

export type LocationState = {
	location: LocationInfo | null;
	error: StateError;
	loading: boolean;
	lastFetchDate: Date | null;
};

export type LocationInfoAPI = {
	as?: {
		asn?: number;
		domain?: string;
		route?: string;
		type?: string;
	};
	ip: string;
	isp: string;
	location: {
		country: string;
		region: string;
		city: string;
		lat: number;
		lng: number;
		postalCode: string;
		timezone: string;
	};
	proxy: {
		proxy: boolean;
		vpn: boolean;
		tor: boolean;
	};
};
