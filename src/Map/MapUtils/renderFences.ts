import Fence from "../../interfaces/Fence";

export default function renderFences(map: H.Map) {
    const storage = localStorage.getItem("fences");

    if(!storage) {
        return;
    }

    const storageObj: Fence[] = JSON.parse(storage);

    let fences: H.map.Circle[]= [];

    storageObj.forEach((fence: Fence) => {
        const newFence = new H.map.Circle(fence.position, fence.radius, {
            data: {}
        })

        fences.push(newFence);
    })

    map.addObjects(fences);
}