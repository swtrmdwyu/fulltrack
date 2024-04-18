export default function selectFencePosition(map: H.Map): Promise<H.geo.Point> {
    document.body.style.cursor = "crosshair";

    return new Promise((resolve) => {
        const tapListener = (event: H.mapevents.Event) => {
            const pointer = event.currentPointer;
            const geoPoint = map.screenToGeo(pointer.viewportX, pointer.viewportY);

            document.body.style.cursor = "default";
            map.removeEventListener("tap", tapListener);
            
            if(geoPoint) {
                resolve(geoPoint);
            } 
        };

        map.addEventListener("tap", tapListener);
    })
    
}