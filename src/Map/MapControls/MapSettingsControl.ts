import H from '@here/maps-api-for-javascript';

export default function MapSettingsControl(baseLayer: H.map.layer.Layer, layers: H.map.layer.Layer[]) {
    const mapSettingsControl = new H.ui.MapSettingsControl({
        baseLayers: [
            { label: "Normal", layer: baseLayer},
            { label: "Tráfego", layer: layers[0]},
            { label: "Satélite", layer: layers[1]}
        ],
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