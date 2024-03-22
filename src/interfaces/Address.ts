export interface Address {
    description: string,
    latitude: number,
    longitude: number,
    additionalData: {
        value: string,
        key: string
    }[],
    label: string
    city: string,
    district: string,
    state: string,
    postal_code: string,
    number: number,
    street: string,
    code: number
    
}