import H from '@here/maps-api-for-javascript';

export default function ZoomControl() {
    const zoomControl = new H.ui.ZoomControl({
        zoomSpeed: 4, 
        slider: false,
    });
    
    const zoomIn = zoomControl.getChildren()[0];
    const zoomOut = zoomControl.getChildren()[1];

    zoomIn.addClass("zoom-in");
    zoomOut.addClass("zoom-out");

    return zoomControl;
}