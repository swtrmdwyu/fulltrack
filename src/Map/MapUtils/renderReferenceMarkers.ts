import ReferencePoint from "../../interfaces/ReferencePoint";
import referenceMarker from "../MapMarkers/referenceMarker";

export default function renderRefPoints(map: H.Map) {
    const storage = localStorage.getItem("referencePoints");

    if(!storage) {
        return;
    }

    const storageObj: ReferencePoint[] = JSON.parse(storage);

    let refPoints: H.map.Marker[]= [];

    storageObj.forEach((reference: ReferencePoint) => {
        const newRefPoint = new H.map.Marker(reference.position, {
            data: {},
            icon: referenceMarker("#B3ADCD")
        })

        refPoints.push(newRefPoint);
    })

    map.addObjects(refPoints);
}