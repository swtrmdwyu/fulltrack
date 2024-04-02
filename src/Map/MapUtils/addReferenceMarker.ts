import referenceMarker from "../MapMarkers/referenceMarker";

export default function addReferenceMarker(map: H.Map, color?: string) {
	const center = map.getCenter();

	const marker = new H.map.Marker(center, {
	  volatility: true,
	  icon: referenceMarker(color ? color : "#B3ADCD"),
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
	}
  
	map.addEventListener("pointermove", pointerMoveListener, false);
	map.addEventListener("tap", removeListeners);
}