import { useEffect, useRef } from 'react';
import H from '@here/maps-api-for-javascript';
import { renderToString } from 'react-dom/server';
import Vehicle from '../../interfaces/Vehicle';
import MarkerTypeName from '../../types/MarkerTypeName';
import VehicleMarker from '../VehicleMarker';
import AgroupControl from './MapControls/AgroupControl';
import ZoomControl from './MapControls/ZoomControl';
import MapSettingsControl from './MapControls/MapSettingsControl';
import { FormatedVehicle } from '../../interfaces/FormatedVehicle';
import VehicleBubble from './MapVehicleBubble/VehicleBubble';
import VehicleCard from '../VehicleCard';
import BubbleContent from '../BubbleContent';


interface MapProps {
    /**
     * Recebe a APIkey da API do HERE.
     */
    apikey: string,
	vehicles: FormatedVehicle[],
	size: boolean;
}

export default function Map({ apikey, vehicles, size }: MapProps) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const map = useRef<H.Map | null>(null);
    const platform = useRef<H.service.Platform | null>(null);
	const vehiclesRef = useRef<FormatedVehicle[] | []>([]);

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

				map.current.setZoom(18);

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
				if(vehicles !== vehiclesRef.current) {
					vehiclesRef.current = vehicles;
					let markers: H.map.DomMarker[] = [];
	
					vehicles.forEach((vehicle: FormatedVehicle) => {
						const coords = {
							lat: vehicle.lat_lng[0],            
							lng: vehicle.lat_lng[1],
						}
						const marker = createCustomMarker(coords, markerType(vehicle), vehicle.ativo_id);
						if(map.current) {
							const ui = new H.ui.UI(map.current);
							const content  = renderToString(<BubbleContent vehicle={vehicle}/>)
							const bubble = VehicleBubble(vehicle, content);
							bubble.setState(H.ui.InfoBubble.State.CLOSED);
							ui.addBubble(bubble);
							
							marker.addEventListener("tap", () => {
								bubble.setState(H.ui.InfoBubble.State.OPEN);
							})
						}

						
						markers.push(marker);
					})
	
					if(markers && map.current) {
						map.current.addObjects(markers);
					}

					map.current.setCenter({
						lat: -23.174269,
						lng: -46.92628
					});
				}
				
				setTimeout(() => {
					if(map.current) {
						map.current.getViewPort().resize();
					}
				}, 400)
			}
		},
			[apikey, size, vehicles]
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
		data: {
			
			"ignition": 1,
				"is_bloqued": 0,
				"dt_gps": "25/03/2024 15:04:32",
				"direction": 143,
				"ativo": {
					"color": "",
					"plate": "FPR-8428",
					"fuel": "",
					"model": "",
					"type": 4,
					"horimeter": 9336881,
					"description": "01316",
					"consume": 0,
					"producer": "",
					"ativo_name": "01316",
					"odometer": 49288923
				},
				"validate": 1,
				"lat_lng": [
					-23.220585,
					-46.87997
				],
				"ativo_id": 208635,
				"client_id": 86155,
				"speed": {
					"val": 58,
					"unit_measurement": "km/h"
				},
				"address": "Rodovia Anhanguera, Vila Maringá, Jundiaí - SP, 13210-811, Brasil",
				"client": "Vesper Jundiai"
			
		}
	});

	return marker;
}

