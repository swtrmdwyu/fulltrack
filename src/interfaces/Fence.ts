import FenceData from "./FenceData";

export default interface Fence {
    position: H.geo.IPoint,
    radius: number,
    data: FenceData
}