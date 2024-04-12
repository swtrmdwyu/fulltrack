export default interface Vehicle {
    speed: {
        val: number,
        unit_measurement: string
    },
    direction: number,
    dt_gps: string, 
    ignition: number,
    validate: number,
    client_id: number,
    lat_lng: number[],
    is_bloqued: number,
    ativo_id: number,
    ativo: {
		type: number,
		horimeter: number,
		odometer: number,
		model: string,
		plate: string,
		description: string,
		consume: number,
		ativo_name: string,
		producer: string,
		fuel: string,
		color: string
    }
}
