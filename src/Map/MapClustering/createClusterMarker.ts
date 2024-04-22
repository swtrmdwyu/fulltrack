import H from '@here/maps-api-for-javascript';
import { stringCluster } from '../../Components/ClusterMarker';

export default function createClusterMarker(cluster: H.clustering.ICluster) {
	const svg = stringCluster(cluster.getWeight());

    // const clusterElement = `<div class="cluster-container">${cluster.getWeight()}</div>`;

	const marker = new H.map.Marker(cluster.getPosition(), {
		icon: new H.map.Icon(svg),
		data: {},
		min: cluster.getMinZoom(),
		max: cluster.getMaxZoom(),
		volatility: true
	});

	return marker;
}