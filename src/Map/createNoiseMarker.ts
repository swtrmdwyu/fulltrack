import H from '@here/maps-api-for-javascript';

export function createNoiseMarker(
    noisePoint: H.clustering.INoisePoint,
    element: string, 
) {
	const marker = new H.map.DomMarker(noisePoint.getPosition(), {
		icon: new H.map.DomIcon(element),
		data: {...noisePoint.getData()},
		min: noisePoint.getMinZoom(),
	});
	
	marker.addEventListener("tap", () => {
		console.log(noisePoint.getData());
	})
	return marker;
}