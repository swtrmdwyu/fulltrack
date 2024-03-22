import { useEffect, useRef } from 'react';
import H from '@here/maps-api-for-javascript';
import { renderToString } from 'react-dom/server';
import Vehicle from '../../interfaces/Vehicle';
import MarkerTypeName from '../../types/MarkerTypeName';
import VehicleMarker from '../VehicleMarker';
import AgroupControl from './MapControls/AgroupControl';
import ZoomControl from './MapControls/ZoomControl';
import MapSettingsControl from './MapControls/MapSettingsControl';


interface MapProps {
    /**
     * Recebe a APIkey da API do HERE.
     */
    apikey: string,
	vehicles: Vehicle[] | [],
	size: boolean;
}

export default function Map({ apikey, vehicles, size }: MapProps) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const map = useRef<H.Map | null>(null);
    const platform = useRef<H.service.Platform | null>(null);

    useEffect(
        () => {
			if (!map.current) {
				platform.current = new H.service.Platform({ apikey });

				const rasterTileService = platform.current.getRasterTileService({
					queryParams: {
						style: "explore.day",
						size: 512,
					},
				});

				const rasterTileProvider = new H.service.rasterTile.Provider(
					rasterTileService
				);

				const rasterTileLayer = new H.map.layer.TileLayer(rasterTileProvider);

				const newMap = new H.Map(mapRef.current!, rasterTileLayer, {
					pixelRatio: window.devicePixelRatio,
					center: {
						lat: -22.215345726608412,            
						lng: -49.65385461158809,
					},
					zoom: 16,
				});
      

				new H.mapevents.Behavior(
					new H.mapevents.MapEvents(newMap)
				);
      
				map.current = newMap;

				map.current.setCenter({
					lat: -22.212162,
					lng: -49.729614
				});

				map.current.setZoom(18);

				let markers: H.map.DomMarker[] = [];

				vehicles.forEach((vehicle: Vehicle) => {
					const coords = {
						lat: vehicle.lat_lng[0],            
						lng: vehicle.lat_lng[1],
					}
					const marker = createCustomMarker(coords, markerType(vehicle), vehicle.ativo_id);
					markers.push(marker);
				})

				if(markers && map.current) {
					map.current.addObjects(markers);
				}

				window.addEventListener("resize", () => {
					if(map.current) {
						map.current.getViewPort().resize();
					}
				});

				const defaultLayers = platform.current.createDefaultLayers();

				const ui = new H.ui.UI(map.current);
				ui.addControl("agroupControl", AgroupControl({onStateChange: () => {}}));
				ui.addControl("zoomControl", ZoomControl());
				ui.addControl("mapSettingsControl", MapSettingsControl(defaultLayers));
			}

			if(map.current) {
				setTimeout(() => {
					if(map.current) {
						map.current.getViewPort().resize();
					}
				}, 400)
			}
		},
			[apikey, size]
	);

    return <div style={ { height: "calc(100vh - 3.563rem)" } } ref={mapRef} />;

}


function markerType(vehicle: Vehicle): MarkerTypeName {
	if(vehicle.is_bloqued) {
		return "block";
	}

	if(vehicle.ignition === 0) {
		return "ignition-off"
	}

	if(vehicle.speed.val === 0) {
		return "ignition-on"
	}

	if(vehicle.speed.val > 0) {
		return "moving"
	}

	if(vehicle.dt_gps === "") {
		return "no-signal"
	}

	return undefined;
}

function createCustomMarker(
	coords: { lat: number; lng: number }, 
	markerType: MarkerTypeName, 
	key: number
	
): H.map.DomMarker {
	const markerComponent = renderToString(
		<VehicleMarker
			key={key}
			type={markerType}
		/>
	);

	const marker = new H.map.DomMarker(coords, {
		icon: new H.map.DomIcon(markerComponent),
		data: {}
	});

	return marker;
}