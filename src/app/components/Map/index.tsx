"use client";

import L, { latLng } from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import MapView from "./MapView";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon.src,
	iconRetinaUrl: markerIcon2x.src,
	shadowUrl: markerShadow.src,
});

interface MapProps {
	center?: number[] | null;
}

const Map: React.FC<MapProps> = ({ center }) => {
	return (
		<MapContainer scrollWheelZoom={false} className="h-full">
			<MapView center={center || [51, -0.09]} />
		</MapContainer>
	);
};

export default Map;
