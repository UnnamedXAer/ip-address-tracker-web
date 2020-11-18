import { LatLngLiteral } from 'leaflet';

export type StateError = string | null;

export type LocationInfo = {
	ipAddress: string;
	location: {
		country: string;
		region: string;
		city: string;
		lat: number;
		lng: number;
		postalCode: string;
		timezone: string;
	};
	timezone: string;
	ISP: string;
	latLng: LatLngLiteral;
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
