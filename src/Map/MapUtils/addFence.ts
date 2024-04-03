export default function Add(
	map: H.Map, 
	behavior: H.mapevents.Behavior, 
	position: H.geo.Point, 
	color?: string) {

	const circle = new H.map.Circle(
		position, 
		8000,
		{
			volatility: true,
			data: {}
		}
	);

	circle.draggable = true;
	map.addObject(circle);

	const dragStartListener = (event: H.mapevents.Event) => {
		document.body.style.cursor = "grabbing";
		behavior.disable();

		const pointer = event.currentPointer;
		requestAnimationFrame(() => {
			const geoPoint = map.screenToGeo(pointer.viewportX, pointer.viewportY);

			if (geoPoint) {
				circle.setCenter(geoPoint);
			}
		});
	};

	const dragListener = (event: H.mapevents.Event) => {
		const pointer = event.currentPointer;

		requestAnimationFrame(() => {
			const geoPoint = map.screenToGeo(pointer.viewportX, pointer.viewportY);

			if (geoPoint) {
				circle.setCenter(geoPoint);
			}
		});
	};

	const dragEndListener = () => {
		document.body.style.cursor = "grab";
		behavior.enable();
	}

	circle.addEventListener("pointerenter", () => document.body.style.cursor = "grab");
	circle.addEventListener("pointerleave", () => document.body.style.cursor = "default");
	circle.addEventListener("dragstart", dragStartListener, false);
	circle.addEventListener("drag", dragListener, false);
	circle.addEventListener("dragend", dragEndListener, false);
}