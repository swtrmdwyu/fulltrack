import H from '@here/maps-api-for-javascript';
import createClusterMarker from './createClusterMarker';
import convertToStr from './stringVehicleMarker';
import Vehicle from '../interfaces/Vehicle';
import markerType from './markerTypeName';
import { createNoiseMarker } from './createNoiseMarker';

interface Points {
    latitude: H.geo.Latitude,
    longitude: H.geo.Longitude
}

export default function startClustering(map: H.Map, vehicles: Vehicle[]) {

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
  
const  CUSTOM_THEME = {
    getClusterPresentation: function (cluster: H.clustering.ICluster) {
        const clusterMarker = createClusterMarker(cluster);

        return clusterMarker;
    },
    getNoisePresentation: (noisePoint: H.clustering.INoisePoint) => {

      const type = markerType(noisePoint.getData());
      const element = convertToStr(type);
      const noiseMarker = createNoiseMarker(noisePoint, element);
      return noiseMarker;
    }
    
};