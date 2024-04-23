import Fence from "../../interfaces/Fence";

export default function renderFences(map: H.Map): H.map.Circle[] {
    const storage = localStorage.getItem("fences");

    if(!storage) {
        return [];
    }

    const storageObj: Fence[] = JSON.parse(storage);

    const fences: H.map.Circle[] = [];

    storageObj.forEach((fence: Fence) => {
        const newFence = new H.map.Circle(fence.position, fence.radius, {
            data: {...fence.data}
        });

        newFence.setStyle({
            fillColor: fence.data.colors.fillColor,
            strokeColor: fence.data.colors.strokeColor
        })

        fences.push(newFence);
    });

    const labels: H.map.Marker[] = [];

    map.addObjects(fences);

    

    fences.forEach((fence: H.map.Circle) => {
        const zoom = fence.getData().currentZoom;
        const min = zoom - 3;

        const svg = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"> 
        <circle opacity="0.24" cx="24" cy="24" r="24" fill="#26333B"/>
        <circle cx="24" cy="24" r="15.2727" fill="#26333B"/>
        <text x="24" y="24" text-anchor="middle" dominant-baseline="central" fill="white" font-family="Inter Bold">{weight}</text>
    </svg>`

    const icon = new H.map.Icon(svg, {
    })

        const label = new H.map.Marker(fence.getCenter(), {
            data: {},
            min: min,
            volatility: true,
            icon: icon
        });

        labels.push(label)
    })

    map.addObjects(labels)

    return fences;
}