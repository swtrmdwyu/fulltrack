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

        const svg = `<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <text x="12" y="18" font-size="16" font-family="Arial" font-weight="bold" text-anchor="middle" fill="white" >C</text>
                    </svg>`;

        const icon = new H.map.Icon(svg, {
            size: { w: 32, h: 32 },
            anchor: { y: 16, x: 16 }
        });

        const label = new H.map.Marker(fence.getCenter(), {
            data: {},
            min: min,
            volatility: true,
            icon: icon
        });

        labels.push(label)
    });

    map.addObjects(labels);

    map.addEventListener("wheel", () => {
        const svg = `<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <text x="12" y="18" font-size="16" font-family="Arial" font-weight="bold" text-anchor="middle" fill="white" >C</text>
                    </svg>`;

        const icon = new H.map.Icon(svg, {
            size: { w: 32, h: 32 },
            anchor: { y: 16, x: 16 }
        });

        labels.forEach((label: H.map.Marker) => {
            label.setIcon(icon);
        });
    })

    return fences;
}