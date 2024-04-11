import { useContext, useEffect, useRef, useState } from "react";
import H from "@here/maps-api-for-javascript";
import MarkerTypeName from "../types/MarkerTypeName";
import AgroupControl from "./MapControls/AgroupControl";
import ZoomControl from "./MapControls/ZoomControl";
import MapSettingsControl from "./MapControls/MapSettingsControl";
import { FormatedVehicle } from "../interfaces/FormatedVehicle";
import VehicleBubble from "./MapVehicleBubble/VehicleBubble";
import markerType from "./MapUtils/markerTypeName";
import startClustering from "./MapClustering/clustering";
import ReferenceControl from "./MapControls/ReferenceControl";
import FenceControl from "./MapControls/FenceControl";
import createClusterMarker from "./MapClustering/createClusterMarker";
import { createNoiseMarker } from "./MapClustering/createNoiseMarker";
import stringBubbleContent from "./MapUtils/stringBubbleContent";
import addReferenceMarker from "./MapUtils/addReferenceMarker";
import addFence from "./MapUtils/addFence";
import selectFencePosition from "./MapUtils/selectFencePosition";
import FenceData from "../interfaces/FenceData";
import Fence from "../interfaces/Fence";
import renderFences from "./MapUtils/renderFences";
import renderRefPoints from "./MapUtils/renderReferenceMarkers";
import vehicleMarkerSVG from "./MapMarkers/vehicleMarker";
import { LandmarkContext } from "../Contexts/LandmarkContext";
import LandmarkData from "../interfaces/LandmarkData";
import Landmark from "../interfaces/Landmark";

interface MapProps {
    /**
     * Recebe a APIkey da API do HERE.
     */
    apikey: string,
	vehicles: FormatedVehicle[],
	size: boolean,
	cancelAddingFence?: boolean,
	saveFence?: boolean,
	fenceData: FenceData,
	showFenceSidebar: () => void,
	cancelAddingRefPoint?: boolean,
	showRefPointSidebar: () => void

}

export default function Map({ 
	apikey, 
	vehicles, 
	size, 
	cancelAddingFence, 
	showFenceSidebar, 
	saveFence, 
	fenceData,
	showRefPointSidebar,
	cancelAddingRefPoint,
}: MapProps) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const map = useRef<H.Map | null>(null);
    const platform = useRef<H.service.Platform | null>(null);
	const vehiclesRef = useRef<FormatedVehicle[] | []>([]);
	const [isClustering, setIsClustering] = useState(true);
	const markersRef = useRef<H.map.Marker[] | null>(null);
	const clusterLayer = useRef<H.map.layer.ObjectLayer | null>(null);
	const uiRef = useRef<H.ui.UI | null>(null);
	const bubblesRef = useRef<H.ui.InfoBubble | null>(null);
	const isAddingRef = useRef(false);
	const fenceRef = useRef<H.map.Circle | null>(null);
	const landmarkRef = useRef<H.map.Marker | null>(null);
	const { 
		landmarkColor, 
		changeLandmarkColor, 
		landmarkClient, 
		landmarkDescription, 
		canSaveLandmark, 
		resetLandmark
	} = useContext(LandmarkContext);

    useEffect(
        () => {
			// verifica se nenhum mapa já foi criado para evitar renderizações desnecessárias.
			if (!map.current) {
				// Cria uma nova instancia do platform.
				platform.current = new H.service.Platform({ apikey });

				// Criação de uma layer personalizada.
				const rasterTileService = platform.current.getRasterTileService({
					queryParams: {
						style: "explore.day",
						size: 512,
					}
				});
				const rasterTileProvider = new H.service.rasterTile.Provider(rasterTileService);

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

				const defaultLayers: any = platform.current.createDefaultLayers();

				// Adição dos controles ao mapa.
				const ui = new H.ui.UI(map.current);
				ui.addControl("zoomControl", ZoomControl());
				ui.addControl("mapSettingsControl", MapSettingsControl(rasterTileLayer, defaultLayers));
				ui.addControl("landmarkControl", ReferenceControl({onStateChange: async () => {
					
					if(isAddingRef.current) {
						return;
					}
	
					if(map.current) {
						
						isAddingRef.current  = true;
						const referenceMarker = await addReferenceMarker(map.current);
						landmarkRef.current = referenceMarker;
						showRefPointSidebar();
					}
						
				}}));


				ui.addControl("fenceControl", FenceControl({onStateChange: async () => {
					if(map.current) {
						if(isAddingRef.current) {
							return;
						}

						isAddingRef.current = true;
						const fencePosition = await selectFencePosition(map.current);
						const fence = addFence(map.current, behavior, fencePosition);
						showFenceSidebar();
						fenceRef.current = await fence;
					}
				}}));

				ui.addControl("agroupControl", AgroupControl({onStateChange: () => { toggleClustering() }}));
				
				uiRef.current = ui;

				renderFences(map.current);
				renderRefPoints(map.current);
				
			}

			// Responsavel por atualizar o taamaho do maapa.
			setTimeout(() => {
				if(map.current) {
					map.current.getViewPort().resize();
				}
			}, 600)

			// Verificação e adicção de cluster.
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

			if(clusterLayer.current) {
				map.current.removeLayer(clusterLayer.current);
			}

			let markers: H.map.Marker[] = [];

			// Adiciona markers
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
					const marker = createCustomMarker(coords, markerType(vehicle));
				
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

	if(uiRef.current) {
		const ui = uiRef.current;
		if(!ui.getControl("referenceControl")) {

		}
	} 

	function createCustomMarker(
		coords: H.geo.Point, 
		markerType: MarkerTypeName, 
		zoom?: {min: number, max: number}
		
	): H.map.Marker {
		const markerSVG = vehicleMarkerSVG(markerType);
		const markerIcon = new H.map.Icon(markerSVG);
	
		const marker = new H.map.Marker(coords, {
			icon: markerIcon,
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
		  const element = vehicleMarkerSVG(type);
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

	useEffect(() => {
		if(!map.current || !cancelAddingFence) {
			return;
		}

		map.current.getViewPort().resize();

		if(!fenceRef.current) {
			return;
		}
		
		map.current.removeObject(fenceRef.current)
		isAddingRef.current = false;
		
	}, [cancelAddingFence]);

	useEffect(() => {
		if(!map.current) {
			return;
		}

		if(!fenceRef.current) {
			return;
		}
		const storage = localStorage.getItem("fences");

		const newFence =  {
			position: fenceRef.current.getCenter(),
			description: fenceData.description,
			radius: fenceRef.current.getRadius()
		}

		map.current.getViewPort().resize();

		const fence = new H.map.Circle(fenceRef.current.getCenter(), fenceRef.current.getRadius());
		map.current.removeObject(fenceRef.current);
		map.current.addObject(fence);

		if(storage) {
			const storageObj: Fence[] = JSON.parse(storage);

			storageObj.push(newFence);
			localStorage.setItem("fences", JSON.stringify(storageObj));
			isAddingRef.current = false;
			fenceRef.current = null;

			return;
		}

		localStorage.setItem("fences", JSON.stringify([newFence]));
		isAddingRef.current = false;
		fenceRef.current = null;
		
	}, [saveFence]);

	useEffect(() => {

		if(!map.current || !cancelAddingRefPoint) {
			return;
		}

		if(!landmarkRef.current) {
			return;
		}

		map.current.removeObject(landmarkRef.current);
		map.current.getViewPort().resize();
		landmarkRef.current = null;
		isAddingRef.current = false;
		
	}, [cancelAddingRefPoint]);

	useEffect(() => {
		if(!map.current) {
			return;
		}

		if(!landmarkRef.current) {
			return;
		}

		const storage = localStorage.getItem("referencePoints");

		const data: LandmarkData = {
			description: landmarkDescription,
			color: landmarkColor,
			client: landmarkClient
		}

		const newLandmark =  {
			position: landmarkRef.current.getGeometry(),
			data: data
		}

		landmarkRef.current.setData(data);

		if(storage) {
			const storageObj: Landmark[] = JSON.parse(storage);

			storageObj.push(newLandmark);
			localStorage.setItem("referencePoints", JSON.stringify(storageObj));
			isAddingRef.current = false;
			landmarkRef.current = null;

			return;
		}

		localStorage.setItem("referencePoints", JSON.stringify([newLandmark]));
		isAddingRef.current = false;
		landmarkRef.current = null;
		map.current.getViewPort().resize();
		
		resetLandmark();
	}, [canSaveLandmark]);

	useEffect(() => {
		if(!landmarkRef.current) {
			return;
		}

		changeLandmarkColor(landmarkRef.current);
	}, [landmarkColor])


    return <div style={ { height: "calc(100vh - 3.563rem)" } } ref={mapRef} />;

}
