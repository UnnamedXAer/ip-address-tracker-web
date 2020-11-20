import { LocationInfo, LocationInfoAPI } from '../types/state';

export function mapDataToLocation(
	input: string,
	searchValue: string,
	data: LocationInfoAPI
): LocationInfo {
	if (!(data && data.location?.lat && data.location.lng)) {
		throw new Error('No location in the response data. :(');
	}

	console.log('data', data);

	return {
		search: {
			userInput: input,
			searchValue: searchValue
		},
		ipAddress: data.ip,
		domain: data.as?.domain,
		ISP: data.isp,
		location: {
			latLng: { lat: data.location.lat, lng: data.location.lng },
			city: data.location.city,
			country: data.location.country,
			region: data.location.region,
			postalCode: data.location.postalCode,
			timezone: data.location.timezone
		}
	};
}
