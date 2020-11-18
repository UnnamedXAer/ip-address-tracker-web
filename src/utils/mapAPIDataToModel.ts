import { LocationInfo, LocationInfoAPI } from '../types/state';

export function mapDataToLocation(data: LocationInfoAPI): LocationInfo {
	if (!(data && data.location?.lat && data.location.lng)) {
		throw new Error('No location in the response data. :(');
	}

	console.log('data', data);

	return {
		ipAddress: data.ip,
		ISP: data.isp,
		latLng: { lat: data.location.lat, lng: data.location.lng },
		location: { ...data.location },
		timezone: data.location.timezone
	};
}
