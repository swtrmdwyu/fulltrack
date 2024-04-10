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
            data: reference.data,
            icon: referenceMarker(reference.data.color)
        })

        newRefPoint.addEventListener("tap", () => console.log(newRefPoint.getData()));

        refPoints.push(newRefPoint);
    })

    map.addObjects(refPoints);
}