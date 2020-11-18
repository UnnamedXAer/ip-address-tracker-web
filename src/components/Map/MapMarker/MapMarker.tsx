import React, { useContext, useEffect } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { LocationContext } from '../../../context/locationContext';

function MapMarker() {
	const {
		state: { location }
	} = useContext(LocationContext);

	const map = useMapEvents({
		// click: (ev) => {
		// 	map.locate();
		// },
		// locationfound: (ev) => {
		// 	setPos(ev.latlng);
		// 	map.flyTo(ev.latlng, map.getZoom());
		// }
	});

	useEffect(() => {
		if (location?.latLng) {
			map.flyTo(location.latLng, map.getZoom());
		}
	}, [location, map]);

	return location === null ? null : (
		<Marker position={location.latLng}>
			<Popup>
				{location.location.country}, {location.location.city}{' '}
				{location.location.postalCode}
			</Popup>
		</Marker>
	);
}

export default MapMarker;
