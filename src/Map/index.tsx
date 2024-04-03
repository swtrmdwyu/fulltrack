import { useEffect, useRef, useState } from "react";
import H from "@here/maps-api-for-javascript";
import { renderToString } from "react-dom/server";
import MarkerTypeName from "../types/MarkerTypeName";
import VehicleMarker from "../Components/VehicleMarker";
import AgroupControl from "./MapControls/AgroupControl";
import ZoomControl from "./MapControls/ZoomControl";
import MapSettingsControl from "./MapControls/MapSettingsControl";
import { FormatedVehicle } from "../interfaces/FormatedVehicle";
import VehicleBubble from "./MapVehicleBubble/VehicleBubble";
import markerType from "./markerTypeName";
import startClustering from "./Clustering";
import ReferenceControl from "./MapControls/ReferenceControl";
import FenceControl from "./MapControls/FenceControl";
import createClusterMarker from "./createClusterMarker";
import { createNoiseMarker } from "./createNoiseMarker";
import stringVehicleMarker from "./stringVehicleMarker";
import stringBubbleContent from "./stringBubbleContent";
import addReferenceMarker from "./MapUtils/addReferenceMarker";
import addFence from "./MapUtils/addFence";
import selectFencePosition from "./MapUtils/selectFencePosition";

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
	const [isClustering, setIsClustering] = useState(false);
	const markersRef = useRef<H.map.DomMarker[] | null>(null);
	const clusterLayer = useRef<H.map.layer.ObjectLayer | null>(null);
	const uiRef = useRef<H.ui.UI | null>(null);
	const bubblesRef = useRef<H.ui.InfoBubble | null>(null);
	const [fence, setFence] = useState<H.map.Circle | null>(null);
	const [rer0efenceMarker, setReferenceMarker] = useState<H.map.Marker | null>(null);

    useEffect(
        () => {
			// verifica se nenhum mapa já foi criado para evitar renderizações desnecessárias.
			if (!map.current) {
				// Cria uma nova instancia do platform.
				platform.current = new H.service.Platform({ apikey });

				// Craicção de uma layer personalizada.
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
				
				//cria um novo mapa.
				const newMap = new H.Map(mapRef.current!, rasterTileLayer, {
					pixelRatio: window.devicePixelRatio,
					center: {
						lat: -22.215345726608412,            
						lng: -49.65385461158809,
					},
					zoom: 16,
				});
      
				// Hablilita eventos padrões do mapa.
				const behavior = new H.mapevents.Behavior(
					new H.mapevents.MapEvents(newMap)
				);
				
				map.current = newMap;
				map.current.setZoom(8);

				// Atualiza o tamanho do mapa quando a janela muda de tamanho.
				window.addEventListener("resize", () => {
					if(map.current) {
						map.current.getViewPort().resize();
					}
				});

				//criação das layers do mapa.
				const defaultLayers = platform.current.createDefaultLayers();

				// Criação dos contorles do mapa.+
				const ui = new H.ui.UI(map.current);
				ui.addControl("zoomControl", ZoomControl());
				ui.addControl("mapSettingsControl", MapSettingsControl(defaultLayers));
				ui.addControl("referenceControl", ReferenceControl({onStateChange: () => {
					if(map.current) {
						addReferenceMarker(map.current);
					}
				}}));

				ui.addControl("fenceControl", FenceControl({onStateChange: async () => {
					if(map.current) {
						const fencePosition = await selectFencePosition(map.current);
						addFence(map.current, behavior, fencePosition);
					}
				}}));
				ui.addControl("agroupControl", AgroupControl({onStateChange: () => { toggleClustering() }}));
				
				uiRef.current = ui;
				
			}

			if(clusterLayer.current) {
				map.current.removeLayer(clusterLayer.current);
			}
			
			if(isClustering) {
				if(markersRef.current) {
					map.current.removeObjects(markersRef.current);
					markersRef.current = null;
					vehiclesRef.current = [];					
				}

				clusterLayer.current = startClustering(map.current, vehicles, CUSTOM_THEME);
				
 				return;
			}

			setTimeout(() => {
				if(map.current) {
					map.current.getViewPort().resize();
				}
			}, 400)

			if(clusterLayer.current) {
				map.current.removeLayer(clusterLayer.current);
			}

			let markers: H.map.DomMarker[] = [];

			if(vehicles !== vehiclesRef.current) {

				if(markersRef.current) {
					map.current.removeObjects(markersRef.current);
				}

				vehiclesRef.current = vehicles;

				vehicles.forEach((vehicle: FormatedVehicle) => {

					//coordenadas do veículo.
					const coords = new H.geo.Point(
						vehicle.lat_lng[0],            
						vehicle.lat_lng[1],
					);

					//cria um novo marker.
					const marker = createCustomMarker(coords, markerType(vehicle), vehicle.ativo_id);
				
					marker.addEventListener("tap", () => {
						if(uiRef.current) {
							addVehicleBubble(uiRef.current, vehicle);
						}
					})
					
					markers.push(marker)
				})
				
				map.current.addObjects(markers);
				markersRef.current = markers;
			}

		},
			[apikey, size, vehicles, isClustering]
	);

	function createCustomMarker(
		coords: H.geo.Point, 
		markerType: MarkerTypeName, 
		key: number, 
		zoom?: {min: number, max: number}
		
	): H.map.DomMarker {
		const markerComponent = renderToString(
			<VehicleMarker
				key={key}
				type={markerType}
			/>
		);
	
		const marker = new H.map.DomMarker(coords, {
			icon: new H.map.DomIcon(markerComponent),
			data: {},
			min: zoom ? zoom.min : 0,
			max: zoom ? zoom.max : Infinity
		});
	
		return marker;
	}

	function toggleClustering() {
		setIsClustering((previous) => !previous)
	}

	const CUSTOM_THEME = {
		getClusterPresentation: function (cluster: H.clustering.ICluster) {
			const clusterMarker = createClusterMarker(cluster);
	
			return clusterMarker;
		},

		getNoisePresentation: (noisePoint: H.clustering.INoisePoint) => {
		  const type = markerType(noisePoint.getData());
		  const element = stringVehicleMarker(type);
		  const noiseMarker = createNoiseMarker(noisePoint, element);
		  noiseMarker.addEventListener("tap", () => {
			if(uiRef.current) {
				addVehicleBubble(uiRef.current, noisePoint.getData());
			  }
		  })
		  
		  return noiseMarker;
		}		
	};

	function addVehicleBubble( ui: H.ui.UI, vehicle: FormatedVehicle) {
			const content  = stringBubbleContent(vehicle);
			const bubble = VehicleBubble(vehicle, content);
			bubble.addEventListener("statechange", () => {
				if(bubble.getState() === "closed") {
					ui.removeBubble(bubble)
					bubblesRef.current = null;
				}
			})

			if(!bubblesRef.current) {
				ui.addBubble(bubble);
				bubblesRef.current = bubble;
			}

	}

    return <div style={ { height: "calc(100vh - 3.563rem)" } } ref={mapRef} />;

}

