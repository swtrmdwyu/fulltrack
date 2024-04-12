import landmarkIcon from "../MapMarkers/landmarkIcon";

export default function addLandmark(map: H.Map, color?: string): Promise<H.map.Marker> {

	return new Promise((resolve) => {
		const center = map.getCenter();

		const marker = new H.map.Marker(center, {
		  volatility: true,
		  icon: landmarkIcon(color ? color : "#85919E"),
		  data: {}
		});
	
		marker.draggable = true;
		map.addObject(marker);
	
		const pointerMoveListener = (event: H.mapevents.Event) => {
			const pointer = event.currentPointer;
	
			requestAnimationFrame(() => {
				const geoPoint = map.screenToGeo(pointer.viewportX, pointer.viewportY);
	
				if (geoPoint) {
					marker.setGeometry(geoPoint);
				}
			});
		};
		
		const removeListeners = () => {
			map.removeEventListener("pointermove", pointerMoveListener);
			map.removeEventListener("tap", removeListeners);
			

			const markerPosition: H.geo.Point = marker.getGeometry() as H.geo.Point;
			map.setCenter(markerPosition, true);
			
			resolve(marker);
		}
	  
		map.addEventListener("pointermove", pointerMoveListener, false);
		map.addEventListener("tap", removeListeners);
	})
}