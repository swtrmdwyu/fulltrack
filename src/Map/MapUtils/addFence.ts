import hexToRgba from "../../utils/hexToRgba";

export default function addFence(
	map: H.Map, 
	behavior: H.mapevents.Behavior, 
	position: H.geo.Point
): Promise<H.map.Circle> 
{
	return new Promise((resolve) => {
		const zoomLevel = map.getZoom();
		const baseRadius = 150;
		const maxZoom = 20; 
		const growthFactor = 1.75;
		const radius = baseRadius * Math.pow(growthFactor, maxZoom - zoomLevel);

		const color = "#85919E";
		const fillColor = hexToRgba(color, 0.5);
		
		const circle = new H.map.Circle(
			position, 
			radius,
			{
				volatility: true,
				data: {
					description: "",
					colors: {
						strokeColor: color,
						fillColor: fillColor
					},
					client: {
						client_id: -1,
						client_description: ""
					}
				}
			}
		);

		circle.setStyle({
			fillColor: fillColor,
			strokeColor: color
		})
	
		circle.draggable = true;
		map.addObject(circle);
		map.setCenter(circle.getCenter(), true)
	
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

		resolve(circle);
	})

}