import Landmark from "../../interfaces/Landmark";
import landmarkIcon from "../MapMarkers/landmarkIcon";

export default function renderLandmarks(map: H.Map): H.map.Marker[] {
    const storage = localStorage.getItem("landmarks");

    if(!storage) {
        return [];
    }

    const storageObj: Landmark[] = JSON.parse(storage);

    let landmarks: H.map.Marker[]= [];

    storageObj.forEach((reference: Landmark) => {
        const newLandmark= new H.map.Marker(reference.position, {
            data: reference.data,
            icon: landmarkIcon(reference.data.color)
        })

        landmarks.push(newLandmark);
    })

    map.addObjects(landmarks);
    return landmarks;
}