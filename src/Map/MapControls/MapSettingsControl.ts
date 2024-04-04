import H from '@here/maps-api-for-javascript';

export default function MapSettingsControl(baseLayer: H.map.layer.Layer, defaultLayers: any) {

    const mapSettingsControl = new H.ui.MapSettingsControl({
        baseLayers: [
            { label: "Normal", layer: baseLayer},
            { label: "Satélite", layer: defaultLayers.raster.satellite.map}

        ],
        layers: [
            { label: "Tráfego", layer: defaultLayers.vector.traffic.map},
            
        ]
    });
    
    let cssClass = false;
    let isFirstRender = true;

    setTimeout(() => {
        const element = mapSettingsControl.getElement();
        element?.addEventListener("click", () => {
            if(cssClass || isFirstRender) {
                mapSettingsControl.addClass("map-settings-control-active");
                isFirstRender = false;
                cssClass = false;
                return;
            }
            
            mapSettingsControl.removeClass("map-settings-control-active");
            cssClass = true;
        })
    }, 1000);
    

    mapSettingsControl.addClass("button-control-here");
    mapSettingsControl.addClass("map-settings-control-here");

    return mapSettingsControl;
}