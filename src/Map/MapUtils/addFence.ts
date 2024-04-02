export default function addFence(map: H.Map, color?: string) {
	const center = map.getCenter();
	const circle = new H.map.Circle(center, 800000 * (1 / map.getZoom()));

	circle.draggable = true;
	map.addObject(circle);

	const pointerMoveListener = (event: H.mapevents.Event) => {
		const pointer = event.currentPointer;

		requestAnimationFrame(() => {
			const geoPoint = map.screenToGeo(pointer.viewportX, pointer.viewportY);

			if (geoPoint) {
				circle.setCenter(geoPoint);
			}
		});
	};
	
	const removeListeners = () => {
		map.removeEventListener("drag", pointerMoveListener);
		map.removeEventListener("tap", removeListeners);
	}
  
	map.addEventListener("drag", pointerMoveListener, false);
	map.addEventListener("tap", removeListeners);
}