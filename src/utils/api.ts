import { LocationInfo } from '../types/state';
import { mapDataToLocation } from './mapAPIDataToModel';

export const fetchIPAddressLocation = async (
	address: string | undefined
): Promise<LocationInfo> => {
	const _address = address ? address.trim() : null;
	let url = process.env.REACT_APP_API_URL;
	let ipAddress = '';
	let domain = '';
	let email = '';
	if (_address) {
		const saveLocation = localStorage.getItem(_address);
		if (saveLocation) {
			console.log('saveLocation', saveLocation);
			return JSON.parse(saveLocation) as LocationInfo;
		}
		if (_address.includes('http') || _address.includes('www')) {
			domain = encodeURIComponent(_address);
			url += '&domain=' + domain;
		} else if (/.+@.+\..+/.test(_address)) {
			email = encodeURIComponent(_address);
			url += '&email=' + email;
		} else {
			// TODO: check if ip v4/v6 otherwise throw error
			ipAddress = _address;
			url += '&ipAddress=' + ipAddress;
		}
	}

	try {
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			const locInfo: LocationInfo = mapDataToLocation(data);
			if (locInfo.ipAddress) {
				saveToStorage(locInfo.ipAddress, locInfo);
				if (locInfo.ipAddress !== ipAddress) {
					saveToStorage(ipAddress, locInfo);
				}
			} else if (ipAddress) {
				saveToStorage(ipAddress, locInfo);
			}
			if (domain || email) {
				saveToStorage(_address!, locInfo);
			}
			if (data.as && data.as.domain) {
				saveToStorage(data.as.domain, locInfo);
			}
			return locInfo;
		}
		throw new Error('Response is not Ok :(.');
	} catch (err) {
		console.log('err', err);
		throw err;
	}
};

function saveToStorage(key: string, data: any) {
	localStorage.setItem(key, JSON.stringify(data));
}
