import { useEffect, useRef, useState } from 'react';
import H from '@here/maps-api-for-javascript';
import IVehicle from './interfaces/IVehicle';
import VehicleMarker from './Components/VehicleMarker';
import MarkerTypeName from './types/MarkerTypeName';
import { renderToString } from 'react-dom/server';
import MapControl from './Components/MapControl';

interface MapProps {
    /**
     * Recebe a APIkey da API do HERE.
     */
    apikey: string,
	vehicles: IVehicle[] | [],
}

export default function Map({ apikey, vehicles }: MapProps) {
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
				vehicles.map((vehicle: IVehicle) => {
					const coords = {
						lat: vehicle.lat_lng[0],            
						lng: vehicle.lat_lng[1],
					}

					const marker = createCustomMarker(coords, markerType(vehicle));

					if(map.current) {
						addMarker(map.current, marker);
					}
				});

				window.addEventListener("resize", () => {
					if(map.current) {
						map.current.getViewPort().resize();
					}
				});
			}
		},

			[apikey]
		);

		function markerType(vehicle: IVehicle): MarkerTypeName {
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

			return undefined
		}

		function createCustomMarker(coords: { lat: number; lng: number }, markerType: MarkerTypeName): H.map.DomMarker {

			const markerComponent = renderToString(
				<VehicleMarker
					type={markerType}
				/>
			);

			const marker = new H.map.DomMarker(coords, {
				icon: new H.map.DomIcon(markerComponent),
				data: {}
			  });

			return marker;
		}

		

		
      // Return a div element to hold the map
	  const div = <div style={ { height: "calc(100vh - 3.563rem) " } } ref={mapRef} />;

      return div;

}




function addMarker(map: H.Map, marker: H.map.Marker) {
	map.addObject(marker);
}