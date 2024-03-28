import { useContext, useEffect, useRef, useState } from "react";
import MenuLink from  "../../interfaces/MenuLink";
import Navbar from "../../Components/Navbar";
import Menu from "../../Components/Menu";
import Sidebar from "../../Components/Sidebar";
import DividerBox from "../../Components/DividerBox";
import Searchbar from "../../Components/Searchbar";
import VehicleCard from "../../Components/VehicleCard";
import { MapContainer, MenuContainer, NavContainer, SideBarContainer, StyledDiv, VehiclesCardsContainer } from "./style";
import "../../i18n/config";
import { useTranslation } from "react-i18next"
import Vehicle from "../../interfaces/Vehicle";
import Map from "../../Map";
import { AuthContext } from "../../Contexts/AuthContext";
import getClients from "../../services/getClients";
import getAddress, { AddressRequestParams } from "../../services/getAddress";
import { Address } from "../../interfaces/Address";
import Client from "../../interfaces/Client";
import { FormatedVehicle } from "../../interfaces/FormatedVehicle";
import useGetvehicles from "../../hooks/useGetVehicles";


export default function Home() {
  const { t } = useTranslation();
  const {vehicles} = useGetvehicles();
  const {authTokens} = useContext(AuthContext);
  const [resizeMap, setResizeMap] = useState(false);
  const [searchValue, setSearchValue ] = useState("");
  const [formatedVehicles, setFormatedVehicles] = useState<FormatedVehicle[] | []>([]);
//   const [vehicles, setVehicles] = useState<FormatedVehicle[] | []>([
//     {
//         "ignition": 1,
//         "is_bloqued": 0,
//         "dt_gps": "25/03/2024 15:04:32",
//         "direction": 143,
//         "ativo": {
//             "color": "",
//             "plate": "FPR-8428",
//             "fuel": "",
//             "model": "",
//             "type": 4,
//             "horimeter": 9336881,
//             "description": "01316",
//             "consume": 0,
//             "producer": "",
//             "ativo_name": "01316",
//             "odometer": 49288923
//         },
//         "validate": 1,
//         "lat_lng": [
//             -23.220585,
//             -46.87997
//         ],
//         "ativo_id": 208635,
//         "client_id": 86155,
//         "speed": {
//             "val": 58,
//             "unit_measurement": "km/h"
//         },
//         "address": "Rodovia Anhanguera, Vila Maringá, Jundiaí - SP, 13210-811, Brasil",
//         "client": "Vesper Jundiai"
//     },
//     {
//         "ignition": 0,
//         "is_bloqued": 0,
//         "dt_gps": "25/03/2024 14:45:27",
//         "direction": 0,
//         "ativo": {
//             "color": "BRANCO",
//             "plate": "FAB-5809",
//             "fuel": "3",
//             "model": "9.160 / MARCOPOLO SENIOR ON",
//             "type": 4,
//             "horimeter": 36809582,
//             "description": "01296",
//             "consume": 0,
//             "producer": "Volkswagem",
//             "ativo_name": "01296",
//             "odometer": 246462396
//         },
//         "validate": 1,
//         "lat_lng": [
//             -23.141113,
//             -46.917012
//         ],
//         "ativo_id": 208641,
//         "client_id": 86155,
//         "speed": {
//             "val": 0,
//             "unit_measurement": "km/h"
//         },
//         "address": "Rodovia Vereador Geraldo Dias, Cecap, Jundiaí - SP, 13214-040, Brasil",
//         "client": "Vesper Jundiai"
//     },
//     {
//         "ignition": 1,
//         "is_bloqued": 0,
//         "dt_gps": "25/03/2024 15:04:47",
//         "direction": 146,
//         "ativo": {
//             "color": "",
//             "plate": "ESU5C53",
//             "fuel": "",
//             "model": "",
//             "type": 4,
//             "horimeter": 7099650,
//             "description": "08726",
//             "consume": 0,
//             "producer": "",
//             "ativo_name": "08726",
//             "odometer": 39251706
//         },
//         "validate": 1,
//         "lat_lng": [
//             -23.191497,
//             -46.875549
//         ],
//         "ativo_id": 208646,
//         "client_id": 86155,
//         "speed": {
//             "val": 32,
//             "unit_measurement": "km/h"
//         },
//         "address": "Centro, Jundiaí - SP, 13201-017, Brasil",
//         "client": "Vesper Jundiai"
//     },
//     {
//         "ignition": 0,
//         "is_bloqued": 0,
//         "dt_gps": "25/03/2024 14:58:53",
//         "direction": 0,
//         "ativo": {
//             "color": "BRANCO",
//             "plate": "FQF-3929",
//             "fuel": "3",
//             "model": "9.160 / MARCOPOLO SENIOR ON",
//             "type": 4,
//             "horimeter": 21975653,
//             "description": "1356",
//             "consume": 0,
//             "producer": "Volkswagem",
//             "ativo_name": "1356",
//             "odometer": 251642397
//         },
//         "validate": 1,
//         "lat_lng": [
//             -23.346265,
//             -46.743874
//         ],
//         "ativo_id": 208648,
//         "client_id": 86155,
//         "speed": {
//             "val": 0,
//             "unit_measurement": "km/h"
//         },
//         "address": "Rua Taubaté, 142, Serpa, Caieiras - SP, 07716-045, Brasil",
//         "client": "Vesper Jundiai"
//     },
//     {
//         "ignition": 0,
//         "is_bloqued": 0,
//         "dt_gps": "25/03/2024 15:02:20",
//         "direction": 0,
//         "ativo": {
//             "color": "BRANCO",
//             "plate": "FSG-1858",
//             "fuel": "3",
//             "model": "17.230 / COMIL CAMPIONE R",
//             "type": 4,
//             "horimeter": 52231704,
//             "description": "10836",
//             "consume": 0,
//             "producer": "Volkswagem",
//             "ativo_name": "10836 ",
//             "odometer": 1011296384
//         },
//         "validate": 1,
//         "lat_lng": [
//             -22.556809,
//             -47.369497
//         ],
//         "ativo_id": 218767,
//         "client_id": 87222,
//         "speed": {
//             "val": 0,
//             "unit_measurement": "km/h"
//         },
//         "address": "Rua Ângelo Santa Rosa, Bairro Pires, Limeira - SP, 13486-338, Brasil",
//         "client": "Vesper Limeira"
//     },
//     {
//         "ignition": 1,
//         "is_bloqued": 0,
//         "dt_gps": "25/03/2024 15:04:30",
//         "direction": 348,
//         "ativo": {
//             "color": "BRANCO",
//             "plate": "FCA-2379 ",
//             "fuel": "3",
//             "model": "17.230 / COMIL CAMPIONE R",
//             "type": 4,
//             "horimeter": 0,
//             "description": "10846",
//             "consume": 0,
//             "producer": "Volkswagem",
//             "ativo_name": "10846",
//             "odometer": 0
//         },
//         "validate": 1,
//         "lat_lng": [
//             -22.680295,
//             -47.292644
//         ],
//         "ativo_id": 221826,
//         "client_id": 87222,
//         "speed": {
//             "val": 18,
//             "unit_measurement": "km/h"
//         },
//         "address": "Limeira - SP, 13480-070, Brasil",
//         "client": "Vesper Limeira"
//     },
//     {
//         "ignition": 1,
//         "is_bloqued": 0,
//         "dt_gps": "25/03/2024 15:04:32",
//         "direction": 299,
//         "ativo": {
//             "color": "BRANCO",
//             "plate": "GHQ-3228",
//             "fuel": "3",
//             "model": "17.230 / MARCOPOLO IDEALE R",
//             "type": 4,
//             "horimeter": 47526194,
//             "description": "10816",
//             "consume": 0,
//             "producer": "Volkswagem",
//             "ativo_name": "10816",
//             "odometer": 738741738
//         },
//         "validate": 1,
//         "lat_lng": [
//             -22.679995,
//             -47.295129
//         ],
//         "ativo_id": 221841,
//         "client_id": 87222,
//         "speed": {
//             "val": 42,
//             "unit_measurement": "km/h"
//         },
//         "address": "Limeira - SP, 13480-070, Brasil",
//         "client": "Vesper Limeira"
//     },
//     {
//         "ignition": 0,
//         "is_bloqued": 0,
//         "dt_gps": "25/03/2024 14:35:14",
//         "direction": 0,
//         "ativo": {
//             "color": "BRANCO",
//             "plate": " GAQ-9768  ",
//             "fuel": "3",
//             "model": "17.230 / CAIO SOLAR",
//             "type": 4,
//             "horimeter": 0,
//             "description": "10136 ",
//             "consume": 0,
//             "producer": "Volkswagem",
//             "ativo_name": "10136 ",
//             "odometer": 0
//         },
//         "validate": 1,
//         "lat_lng": [
//             -22.602139,
//             -47.425984
//         ],
//         "ativo_id": 222169,
//         "client_id": 87222,
//         "speed": {
//             "val": 0,
//             "unit_measurement": "km/h"
//         },
//         "address": "Rua Cento e Dezoito, 316A, Jardim Manacá, Limeira - SP, 13481-869, Brasil",
//         "client": "Vesper Limeira"
//     },
//   ]);
 
  const menu: MenuLink[] = [
    { label: t("menu_names.dashboard"), href: "#", icon: "dashboard" },
    { label: t("menu_names.general_map"), href: "#", icon: "world" },
    { label: t("menu_names.mosaic"), href: "#", icon: "interface" },
    { label: t("menu_names.relatories"), href: "#", icon: "chart" },
    { label: t("menu_names.logistic"), href: "#", icon: "navigation" },
    { label: t("menu_names.driver_behavior"), href: "#", icon: "direction" },
    { label: t("menu_names.administrative_panel"), href: "#", icon: "briefcase" },
    { label: t("menu_names.registers"), href: "#", icon: "add" },
    { label: t("menu_names.settings"), href: "#", icon: "settings" },
  ];

  const isFirstRender = useRef(true);

  
  useEffect(() => {
    if(isFirstRender.current) {

      async function getAllData() {
        if(authTokens) {

            if(vehicles) {
                const clients: Client[] = await getClients(authTokens.authToken);

                const addressData: AddressRequestParams[] = vehicles.map((vehicle: Vehicle) => {
                  const addressParams: AddressRequestParams = {              
                    "code": vehicle.ativo_id,
                    "latitude": vehicle.lat_lng[0].toString(),
                    "longitude": vehicle.lat_lng[1].toString(),
                  }
                  return addressParams;
                });
      
                const address: Address[] = await getAddress(authTokens.authToken, addressData);
      
                const forrmatedVehicles: FormatedVehicle[] = vehicles.map((vehicle: Vehicle) => {
                  const vehicleAddress: Address = address.filter((address: Address) => address.code == vehicle.ativo_id)[0];
                  const vehicleCLient: Client = clients.filter((client: Client) => client.client_id === vehicle.client_id)[0];
                  return {
                    ...vehicle,
                    address: vehicleAddress ? vehicleAddress.label : "Não informado",
                    client: vehicleCLient.client_description
                  }
                })
      
                setFormatedVehicles(forrmatedVehicles);
                console.log(formatedVehicles);
            }


        }
      }

      getAllData();
      
    }
  }, [vehicles]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {

  const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);
  }

  const handleSearch = () => console.log(searchValue);

  const handleToggleSidebar = () => {
    setResizeMap(previous => !previous);

  }

  return (
    <StyledDiv>
      <NavContainer>
      <Navbar />
      </NavContainer>
        
      <MenuContainer>
        <Menu 
        menuLinks={menu}
        />
      </MenuContainer>

      <SideBarContainer>
        <Sidebar onClick={handleToggleSidebar}>
          <DividerBox>
            <Searchbar 
              placeholder="Pesquisar..." 
              value={searchValue}
              onChange={handleSearchChange}
              handleSearch={handleSearch}
            />
          </DividerBox>

          <VehiclesCardsContainer>
            {vehicles && formatedVehicles.map((vehicle: FormatedVehicle) => 
                <DividerBox key={vehicle.ativo_id}>
                  <VehicleCard vehicle={vehicle}></VehicleCard>
                </DividerBox>
            )}  
          </VehiclesCardsContainer>
        </Sidebar>
      </SideBarContainer>
     <MapContainer>
        {
        <Map 
          size={resizeMap}
          apikey="v3XFar3gKIuWv7fn4sNSVWtQy9MD9-yq5rCh5f0tpfA"
          vehicles={formatedVehicles}
        /> }
     </MapContainer>
      
    </StyledDiv>
  )
}
