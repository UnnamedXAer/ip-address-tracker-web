import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapMarker from '../../components/Map/MapMarker/MapMarker';
import './Map.css';

function Map() {
	return (
		<div className="map">
			<MapContainer
				center={{ lat: 51.505, lng: -0.09 }}
				zoom={13}
				scrollWheelZoom={'center'}
			>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MapMarker />
			</MapContainer>
		</div>
	);
}

export default Map;
