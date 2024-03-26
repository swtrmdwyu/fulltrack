import H from '@here/maps-api-for-javascript';
import { createCustomMarker } from '.';
interface Points {
    latitude: H.geo.Latitude,
    longitude: H.geo.Longitude
}
export default function startClustering(map: H.Map, data: Points[]) {

    const dataPoints = data.map((point: Points) => {
      return new H.clustering.DataPoint(point.latitude, point.longitude, undefined, {});
    });
  
    const clusteredDataProvider = new H.clustering.Provider(dataPoints, {
      clusteringOptions: {
        eps: 64,
        minWeight: 2
      },
      theme: CUSTOM_THEME
    });

    var layer = new H.map.layer.ObjectLayer(clusteredDataProvider);
    map.addLayer(layer);

    return layer;
  }
  
const  CUSTOM_THEME = {
    getClusterPresentation: function (cluster: H.clustering.ICluster) {

        const zoom = {
            min: cluster.getMinZoom(),
            max: cluster.getMaxZoom()
        }

        console.log(zoom)

        const clusterMarker = createCustomMarker(cluster.getPosition(), "moving", 1, zoom)

        return clusterMarker;
    },
    getNoisePresentation: (noisePoint: H.clustering.INoisePoint) => {
        const zoom = {
            min: noisePoint.getMinZoom(),
            max: Infinity
        }
        const noiseMarker = createCustomMarker(noisePoint.getPosition(), "ignition-on", 1, zoom)

        return noiseMarker;
    }
    
};