import { useContext, useRef } from "react";
import { MapContext } from "../../Contexts/MapContext";
import startClustering from "../MapClustering/clustering";
import markerType from "../MapUtils/markerTypeName";
import vehicleMarkerSVG from "../MapMarkers/vehicleMarker";
import { createNoiseMarker } from "../MapClustering/createNoiseMarker";
import createClusterMarker from "../MapClustering/createClusterMarker";

export default function Cluster() {
    const { map, isClustering, ui } = useContext(MapContext);
    const clusterLayer = useRef<H.map.layer.ObjectLayer | null>(null);

    if(!map || !ui) {
        return null;
    }

    const vehicles = [{
        "validate": 1,
        "client_id": 86155,
        "lat_lng": [
            -23.169087,
            -46.946605
        ],
        "dt_gps": "19/04/2024 16:23:53",
        "ignition": 0,
        "ativo": {
            "type": 4,
            "color": "",
            "producer": "",
            "fuel": "",
            "model": "",
            "ativo_name": "01316",
            "horimeter": 9913337,
            "consume": 0,
            "odometer": 52474079,
            "plate": "FPR-8428",
            "description": "01316"
        },
        "ativo_id": 208635,
        "direction": 0,
        "is_bloqued": 0,
        "speed": {
            "val": 0,
            "unit_measurement": "km/h"
        }
    },
    {
        "validate": 1,
        "client_id": 86155,
        "lat_lng": [
            -23.240675,
            -46.885353
        ],
        "dt_gps": "19/04/2024 16:40:22",
        "ignition": 1,
        "ativo": {
            "type": 4,
            "color": "BRANCO",
            "producer": "Volkswagem",
            "fuel": "3",
            "model": "9.160 / MARCOPOLO SENIOR ON",
            "ativo_name": "01296",
            "horimeter": 37391764,
            "consume": 0,
            "odometer": 250311639,
            "plate": "FAB-5809",
            "description": "01296"
        },
        "ativo_id": 208641,
        "direction": 132,
        "is_bloqued": 0,
        "speed": {
            "val": 94,
            "unit_measurement": "km/h"
        }
    },
    {
        "validate": 1,
        "client_id": 86155,
        "lat_lng": [
            -23.174017,
            -46.926346
        ],
        "dt_gps": "19/04/2024 16:44:48",
        "ignition": 0,
        "ativo": {
            "type": 4,
            "color": "",
            "producer": "",
            "fuel": "",
            "model": "",
            "ativo_name": "08726",
            "horimeter": 7756094,
            "consume": 0,
            "odometer": 43046560,
            "plate": "ESU5C53",
            "description": "08726"
        },
        "ativo_id": 208646,
        "direction": 0,
        "is_bloqued": 0,
        "speed": {
            "val": 0,
            "unit_measurement": "km/h"
        }
    },
    {
        "validate": 1,
        "client_id": 86155,
        "lat_lng": [
            -23.346307,
            -46.743817
        ],
        "dt_gps": "19/04/2024 16:37:30",
        "ignition": 0,
        "ativo": {
            "type": 4,
            "color": "BRANCO",
            "producer": "Volkswagem",
            "fuel": "3",
            "model": "9.160 / MARCOPOLO SENIOR ON",
            "ativo_name": "1356",
            "horimeter": 22486745,
            "consume": 0,
            "odometer": 254628831,
            "plate": "FQF-3929",
            "description": "1356"
        },
        "ativo_id": 208648,
        "direction": 0,
        "is_bloqued": 0,
        "speed": {
            "val": 0,
            "unit_measurement": "km/h"
        }
    },
    ]

    const CUSTOM_THEME = {
		getClusterPresentation: function (cluster: H.clustering.ICluster) {
			const clusterMarker = createClusterMarker(cluster);
	
			return clusterMarker;
		},

		getNoisePresentation: (noisePoint: H.clustering.INoisePoint) => {
		  const type = markerType(noisePoint.getData());
		  const element = vehicleMarkerSVG(type);
		  const noiseMarker = createNoiseMarker(noisePoint, element);
		  noiseMarker.addEventListener("tap", () => {
			if(ui) {
				// addVehicleBubble(ui, noisePoint.getData());
			  }
		  })
		  
		  return noiseMarker;
		}		
	};

    const cluster = startClustering(map, vehicles, CUSTOM_THEME);

    if(!clusterLayer.current && isClustering) {
        clusterLayer.current = cluster;
        map.addLayer(clusterLayer.current)
        return null;
    }

    if(!isClustering && clusterLayer.current) {
        map.removeLayer(clusterLayer.current);
        clusterLayer.current = null;
    }

    return null;
}