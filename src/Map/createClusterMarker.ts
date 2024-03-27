import H from '@here/maps-api-for-javascript';

export default function createClusterMarker(cluster: H.clustering.ICluster) {
    const clusterElement = `<div class="cluster-container">${cluster.getWeight()}</div>`;

	const marker = new H.map.DomMarker(cluster.getPosition(), {
		icon: new H.map.DomIcon(clusterElement),
		data: {},
		min: cluster.getMinZoom(),
		max: cluster.getMaxZoom(),
	});

	return marker;
}