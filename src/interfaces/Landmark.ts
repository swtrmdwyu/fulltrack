import LandmarkData from "./LandmarkData";

export default interface Landmark {
    position: H.geo.Point | H.geo.MultiPoint,
    data: LandmarkData
}