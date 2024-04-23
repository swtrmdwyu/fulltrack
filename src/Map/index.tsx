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
import Fence from "../interfaces/Fence";
import vehicleMarkerSVG from "./MapMarkers/vehicleMarker";
import { LandmarkContext } from "../Contexts/LandmarkContext";
import LandmarkData from "../interfaces/LandmarkData";
import Landmark from "../interfaces/Landmark";
import { FenceContext } from "../Contexts/FenceContext";
import hexToRgba from "../utils/hexToRgba";
import selectFencePosition from "./MapFence/selectFencePosition";
import addFence from "./MapFence/addFence";
import renderFences from "./MapFence/renderFences";
import renderLandmarks from "./MapLandmark/renderLandmarks";
import { stringBubbleContent } from "../Components/BubbleContent";
import addLandmark from "./MapLandmark/addLandmark";

interface MapProps {
    /**
     * Recebe a APIkey da API do HERE.
     */
    apikey: string,
	/**
     * Array com os veículos a serem renderizados no mapa.
     */
	vehicles: FormatedVehicle[],
	size: boolean,
	cancelAddingFence?: boolean,
	saveFence?: boolean,
	showFenceSidebar: () => void,
	cancelAddingLandmark?: boolean,
	showRefPointSidebar: () => void

}

export default function Map({ 
	apikey, 
	vehicles, 
	size, 
	cancelAddingFence, 
	showFenceSidebar, 
	saveFence, 
	showRefPointSidebar,
	cancelAddingLandmark,
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
	const landmarkBubbleRef = useRef<H.ui.InfoBubble | null>(null);
	const fenceBubbleRef = useRef<H.ui.InfoBubble | null>(null);

	const { 
		landmarkColor, 
		changeLandmarkColor, 
		landmarkClient, 
		landmarkDescription, 
		canSaveLandmark, 
		resetLandmark,
		landmarkAddress,
		changeLandmarkAddress,
		landmarkBubble
	} = useContext(LandmarkContext);
	const {
		fenceColor,
		changeFenceColor,
		fenceDescription,
		fenceClient,
		fenceVehicles,
		createFenceBubble,
		resetFence
	} = useContext(FenceContext);

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
						const landmark = await addLandmark(map.current);
						changeLandmarkAddress(landmark);
						landmarkRef.current = landmark;
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

				const fences = renderFences(map.current);
				const landmarks = renderLandmarks(map.current);

				landmarks.forEach((landmark: H.map.Marker) => {
					landmark.addEventListener("tap", (event: H.mapevents.Event) => {
						const target = event.target as H.map.Marker;
						const bubble = landmarkBubble(target);
						
						bubble.addClass("landmark-bubble");

						bubble.setData({
							target: target
						});
			
						if(!uiRef.current) {
							return;
						}
			
						if(landmarkBubbleRef.current) {
							if(landmarkBubbleRef.current.getData().target !== bubble.getData().target) {
								uiRef.current.removeBubble(landmarkBubbleRef.current);
								uiRef.current.addBubble(bubble);
								landmarkBubbleRef.current = bubble;
								return;
							}

							uiRef.current.removeBubble(landmarkBubbleRef.current);
							landmarkBubbleRef.current = null;
			
							return;
						}

						uiRef.current.addBubble(bubble);
						landmarkBubbleRef.current = bubble;
					})
				})

				fences.forEach((fence: H.map.Circle) => {
					fence.addEventListener("tap", (event: H.mapevents.Event) => {
						const target = event.target as H.map.Circle;
						const bubble = createFenceBubble(target);
						
						bubble.addClass("landmark-bubble");

						bubble.setData({
							target: target
						});
			
						if(!uiRef.current) {
							return;
						}
			
						if(fenceBubbleRef.current) {
							if(fenceBubbleRef.current.getData().target !== bubble.getData().target) {
								uiRef.current.removeBubble(fenceBubbleRef.current);
								uiRef.current.addBubble(bubble);
								fenceBubbleRef.current = bubble;
								return;
							}

							uiRef.current.removeBubble(fenceBubbleRef.current);
							fenceBubbleRef.current = null;
			
							return;
						}

						uiRef.current.addBubble(bubble);
						fenceBubbleRef.current = bubble;
					})
				})
				
			}

			// Responsavel por atualizar o taamaho do maapa.
			setTimeout(() => {
				if(map.current) {
					map.current.getViewPort().resize();
				}
			}, 500)

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

		resetFence();

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

		resetFence();

		const newFence: Fence =  {
			position: fenceRef.current.getCenter(),
			radius: fenceRef.current.getRadius(),
			data: {
				description: fenceDescription,
				colors: {
					fillColor: hexToRgba(fenceColor, 0.5),
					strokeColor: fenceColor
				},
				client: fenceClient,
				vehicles: fenceVehicles,
				currentZoom: map.current.getZoom(),
			}
		}

		map.current.getViewPort().resize();

		//cria uma copia porem sem os listeners da outra
		const fence = new H.map.Circle(fenceRef.current.getCenter(), fenceRef.current.getRadius(), {
			data: {
				...newFence.data
			}
		});

		fence.setStyle({
			fillColor: newFence.data.colors.fillColor,
			strokeColor: newFence.data.colors.strokeColor
		});


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

		if(!map.current || !cancelAddingLandmark) {
			return;
		}

		if(!landmarkRef.current) {
			return;
		}

		map.current.removeObject(landmarkRef.current);
		map.current.getViewPort().resize();
		landmarkRef.current = null;
		isAddingRef.current = false;
		
	}, [cancelAddingLandmark]);

	useEffect(() => {
		if(!map.current) {
			return;
		}

		if(!landmarkRef.current) {
			return;
		}

		const storage = localStorage.getItem("landmarks");

		const data: LandmarkData = {
			description: landmarkDescription,
			color: landmarkColor,
			client: landmarkClient,
			address: landmarkAddress
		}

		const newLandmark =  {
			position: landmarkRef.current.getGeometry(),
			data: data
		}

		landmarkRef.current.setData(data);
		landmarkRef.current.addEventListener("tap", (event: H.mapevents.Event) => {
			const target = event.target as H.map.Marker;
			const bubble = landmarkBubble(target);
			bubble.setData({
				target: target
			})

			if(!uiRef.current) {
				return;
			}

			if(landmarkBubbleRef.current) {
				if(landmarkBubbleRef.current.getData().target !== bubble.getData().target) {
					uiRef.current.removeBubble(landmarkBubbleRef.current);
					uiRef.current.addBubble(bubble);
					landmarkBubbleRef.current = bubble;
					return;
				}

				uiRef.current.removeBubble(landmarkBubbleRef.current);
				landmarkBubbleRef.current = null;

				return;
			}

			uiRef.current.addBubble(bubble);
			landmarkBubbleRef.current = bubble;
		})

		if(storage) {
			const storageObj: Landmark[] = JSON.parse(storage);

			storageObj.push(newLandmark);
			localStorage.setItem("landmarks", JSON.stringify(storageObj));
			isAddingRef.current = false;
			landmarkRef.current = null;
			resetLandmark();
			return;
		}

		localStorage.setItem("landmarks", JSON.stringify([newLandmark]));
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
	}, [landmarkColor]);


	useEffect(() => {
		if(!fenceRef.current) {
			return;
		}

		changeFenceColor(fenceRef.current);
	}, [fenceColor]);


    return <div style={ { height: "calc(100vh - 3.563rem)" } } ref={mapRef} />;

}
