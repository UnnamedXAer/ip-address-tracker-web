import { LocationInfo, LocationInfoError } from '../types/state';
import { mapDataToLocation } from './mapAPIDataToModel';

const defaultErrorMsg = 'Unable to find location for your input.';

export const fetchIPAddressLocation = async (
	address: string | undefined
): Promise<LocationInfo> => {
	const _address = address ? address.trim() : '';
	let searchParams = '';
	let searchValue = encodeURIComponent(_address);
	if (_address) {
		const savedLocation = localStorage.getItem(_address);

		if (savedLocation) {
			const savedLocationObj = JSON.parse(savedLocation) as
				| LocationInfo
				| LocationInfoError;

			if ('isError' in savedLocationObj) {
				throw new Error(savedLocationObj.message);
			}

			return savedLocationObj;
		}

		if (
			/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/.test(
				_address
			)
		) {
			searchParams += '&ipAddress=';
		} else if (
			/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
				_address
			)
		) {
			searchParams += '&email=';
		} else {
			searchParams += '&domain=';
		}
		searchParams += searchValue;
	}

	try {
		const headers = new Headers();
		headers.set('Accept', 'application/json');
		headers.set('Content-Type', 'application/json');
		const body = JSON.stringify({ searchParams });
		const reqInit: RequestInit = {
			method: 'POST',
			credentials: 'same-origin',
			headers,
			body: body
		};

		const response = await fetch('/ipify', reqInit);
		const data = await response.json();
		if (data.ip || (data.results && data.results[0])) {
			const _data = data.ip ? data : data.results[0];
			if (!_data.ip) {
				saveToStorage(_address, {
					code: 999,
					isError: true,
					message: defaultErrorMsg
				});
				throw new Error(defaultErrorMsg);
			}
			const locInfo: LocationInfo = mapDataToLocation(_address, searchValue, _data);

			if (searchValue) {
				saveToStorage(searchValue!, locInfo);
			}
			if (locInfo.ipAddress) {
				if (!searchValue || locInfo.ipAddress !== searchValue) {
					saveToStorage(locInfo.ipAddress, locInfo);
				}
			}
			if (_data.as && _data.as.domain && _data.as.domain !== _address) {
				saveToStorage(_data.as.domain, locInfo);
			}
			return locInfo;
		}
		const errorData: LocationInfoError = {
			message: data.messages || defaultErrorMsg,
			code: data.code || response.status || 999,
			isError: true
		};
		saveToStorage(_address, errorData);
		throw new Error(errorData.message);
	} catch (err) {
		console.log('err', err);
		throw err;
	}
};

function saveToStorage(key: string, data: any) {
	localStorage.setItem(key, JSON.stringify(data));
}
