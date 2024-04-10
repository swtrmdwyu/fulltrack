export default interface ReferencePoint {
    position: H.geo.Point | H.geo.MultiPoint,
    data: {
        description: string,
        client: string,
        color: string
    }
}