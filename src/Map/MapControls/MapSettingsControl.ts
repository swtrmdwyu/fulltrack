import H from '@here/maps-api-for-javascript';

export default function MapSettingsControl(defaultLayers: any) {
    const mapSettingsControl = new H.ui.MapSettingsControl({
        baseLayers: [
            { label: "Normal", layer: defaultLayers.vector.normal.map }
        ],
        layers: [
            { label: "Tráfego", layer: defaultLayers.vector.normal.traffic },
            { label: "Satélite", layer: defaultLayers.raster.satellite.map }
        ],
    });

    mapSettingsControl.addClass("button-control-here");
    mapSettingsControl.addClass("map-settings-control-here");

    return mapSettingsControl;
}