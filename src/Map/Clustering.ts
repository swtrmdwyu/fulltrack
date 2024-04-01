import H from '@here/maps-api-for-javascript';
import Vehicle from '../interfaces/Vehicle';


export default function startClustering(
  map: H.Map, vehicles: Vehicle[], 
  CUSTOM_THEME:{
    getClusterPresentation: (cluster: H.clustering.ICluster) => H.map.DomMarker,
    getNoisePresentation: (noisePoint: H.clustering.INoisePoint) => H.map.DomMarker
  }
) {
    const dataPoints = vehicles.map((point: Vehicle) => {
      return new H.clustering.DataPoint(point.lat_lng[0], point.lat_lng[1], undefined, point);
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
  
