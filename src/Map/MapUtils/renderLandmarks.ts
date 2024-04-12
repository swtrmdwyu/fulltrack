import Landmark from "../../interfaces/Landmark";
import landmarkIcon from "../MapMarkers/landmarkIcon";

export default function renderLandmarks(map: H.Map) {
    const storage = localStorage.getItem("landmarks");

    if(!storage) {
        return;
    }

    const storageObj: Landmark[] = JSON.parse(storage);

    let landmarks: H.map.Marker[]= [];

    storageObj.forEach((reference: Landmark) => {
        const newLandmark= new H.map.Marker(reference.position, {
            data: reference.data,
            icon: landmarkIcon(reference.data.color)
        })

        newLandmark.addEventListener("tap", () => console.log(newLandmark.getData()));

        landmarks.push(newLandmark);
    })

    map.addObjects(landmarks);
}