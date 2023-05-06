import { Marker, TileLayer, useMap } from "react-leaflet";

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
	'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

interface MapViewProps {
	center: number[];
}
const MapView: React.FC<MapViewProps> = ({ center }) => {
	const map = useMap();
	map.setView(center as L.LatLngExpression, center ? 4 : 2);
	return (
		<>
			<TileLayer url={url} attribution={attribution} />
			{center && <Marker position={center as L.LatLngExpression} />}
		</>
	);
};

export default MapView;
