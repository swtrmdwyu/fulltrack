import H from '@here/maps-api-for-javascript';

export function createNoiseMarker(
    noisePoint: H.clustering.INoisePoint,
    element: string,
) {
	const marker = new H.map.Marker(noisePoint.getPosition(), {
		icon: new H.map.Icon(element),
		data: {...noisePoint.getData()},
		min: noisePoint.getMinZoom(),
	});
	
	return marker;
}