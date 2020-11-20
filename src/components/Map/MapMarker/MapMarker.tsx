import React, { useContext, useEffect } from 'react';
import './MapMarker.css';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { LocationContext } from '../../../context/locationContext';

function MapMarker() {
	const {
		state: { location: locInfo }
	} = useContext(LocationContext);

	const map = useMapEvents({
		click: (ev) => {
			map.setView(ev.latlng, map.getZoom(), {
				animate: true
			});
		}
	});

	useEffect(() => {
		if (locInfo?.location.latLng) {
			map.flyTo(locInfo?.location.latLng, map.getZoom());
		}
	}, [locInfo, map]);

	return locInfo === null ? null : (
		<Marker position={locInfo?.location.latLng}>
			<Popup className="map-marker__popup">
				<p>
					{locInfo.location.country},{' '}
					{locInfo.location.region && locInfo.location.region}
					<br />
					{locInfo.location.city}
					<br />
					{locInfo.location.postalCode}
				</p>
			</Popup>
		</Marker>
	);
}

export default MapMarker;
