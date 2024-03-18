import { useState } from "react";
import MenuLink from "../../interfaces/IMenuLink";
import Vehicle from "../../interfaces/IVehicle";
import Navbar from "../../Components/Navbar";
import Menu from "../../Components/Menu";
import Sidebar from "../../Components/Sidebar";
import DividerBox from "../../Components/DividerBox";
import Searchbar from "../../Components/Searchbar";
import VehicleCard from "../../Components/VehicleCard";
import Map from "../../Map";
import { MapContainer, MenuContainer, NavContainer, SideBarContainer, StyledDiv, VehiclesCardsContainer } from "./style";
import "../../i18n/config";
import { useTranslation } from "react-i18next"
import MapControl from "../../Components/MapControl";
import IVehicle from "../../interfaces/IVehicle";
import axios from "axios";

export default function Home() {
  const [resizeMap, setResizeMap] = useState(false);
  const [vehicles, setVehicles] = useState<IVehicle[] | []>([]);

  setVehicles([
    {
      "speed": {
        "val": 0,
        "unit_measurement": "km/h"
      },
      "direction": 0,
      "dt_gps": "07/10/2022 06:32:01",
      "ignition": 0,
      "validate": 1,
      "client_id": 22647,
      "lat_lng": [
        -22.212162,
        -49.729614
      ],
      "is_bloqued": 0,
      "ativo_id": 45048,
      "ativo": {
        "type": 1,
        "horimeter": 542155,
        "odometer": 1963814,
        "model": "sedan",
        "plate": "CZE2042",
        "description": "",
        "consume": 12,
        "ativo_name": "Parati Track Field",
        "producer": "",
        "fuel": "ga",
        "color": "branco"
      }
    },
    {
      "speed": {
        "val": 0,
        "unit_measurement": "km/h"
      },
      "direction": 22,
      "dt_gps": "07/10/2022 06:30:03",
      "ignition": 0,
      "validate": 1,
      "client_id": 72724,
      "lat_lng": [
        -22.215057,
        -49.65246
      ],
      "is_bloqued": 0,
      "ativo_id": 156167,
      "ativo": {
        "type": 1,
        "horimeter": 3283244,
        "odometer": 30957703,
        "model": "ETIOS",
        "plate": "GV50 - Eti",
        "description": "GV50 - Etios JEAN",
        "consume": 0,
        "ativo_name": "GV50 - Etios Fulltime",
        "producer": "Toyota",
        "fuel": "4",
        "color": ""
      }
    },
    {
      "speed": {
        "val": 0,
        "unit_measurement": "km/h"
      },
      "direction": 261,
      "dt_gps": "06/10/2022 19:00:20",
      "ignition": 0,
      "validate": 0,
      "client_id": 72724,
      "lat_lng": [
        -22.159155,
        -49.717935
      ],
      "is_bloqued": 0,
      "ativo_id": 157718,
      "ativo": {
        "type": 5,
        "horimeter": 1872419,
        "odometer": 1621029,
        "model": "",
        "plate": "A850",
        "description": "Trator A850",
        "consume": 0,
        "ativo_name": "Trator A850",
        "producer": "",
        "fuel": "1",
        "color": ""
      }
    },
    {
      "speed": {
        "val": 0,
        "unit_measurement": "km/h"
      },
      "direction": 274,
      "dt_gps": "27/07/2022 17:16:17",
      "ignition": 1,
      "validate": 1,
      "client_id": 96237,
      "lat_lng": [
        -22.215312,
        -49.654295
      ],
      "is_bloqued": 0,
      "ativo_id": 234756,
      "ativo": {
        "type": 1,
        "horimeter": 0,
        "odometer": 0,
        "model": "",
        "plate": "GV300N",
        "description": "GV300N",
        "consume": 0,
        "ativo_name": "GV300N",
        "producer": "",
        "fuel": "1",
        "color": ""
      }
    },
    {
      "speed": {
        "val": 0,
        "unit_measurement": "km/h"
      },
      "direction": 0,
      "dt_gps": "07/10/2022 06:22:57",
      "ignition": 0,
      "validate": 1,
      "client_id": 127696,
      "lat_lng": [
        -22.213566,
        -49.663933
      ],
      "is_bloqued": 0,
      "ativo_id": 313346,
      "ativo": {
        "type": 3,
        "horimeter": 3821176,
        "odometer": 16825776,
        "model": "",
        "plate": "DLC 8058",
        "description": "Corolla_Vinicius",
        "consume": 0,
        "ativo_name": "Corolla_Vinicius",
        "producer": "",
        "fuel": "1",
        "color": ""
      }
    },
    {
      "speed": {
        "val": 0,
        "unit_measurement": "km/h"
      },
      "direction": 57,
      "dt_gps": "30/09/2022 17:03:41",
      "ignition": 1,
      "validate": 1,
      "client_id": 132788,
      "lat_lng": [
        -22.215587,
        -49.654106
      ],
      "is_bloqued": 1,
      "ativo_id": 345619,
      "ativo": {
        "type": 1,
        "horimeter": 0,
        "odometer": 0,
        "model": "",
        "plate": "user123",
        "description": "",
        "consume": 0,
        "ativo_name": "user carro",
        "producer": "",
        "fuel": "1",
        "color": ""
      }
    },
    {
      "speed": {
        "val": 0,
        "unit_measurement": "km/h"
      },
      "direction": 0,
      "dt_gps": "30/06/2022 17:03:54",
      "ignition": 0,
      "validate": 1,
      "client_id": 139309,
      "lat_lng": [
        -22.2152796,
        -49.654169
      ],
      "is_bloqued": 0,
      "ativo_id": 381358,
      "ativo": {
        "type": 3,
        "horimeter": 259200,
        "odometer": 567001,
        "model": "",
        "plate": "YOKOTA CEL",
        "description": "YOKOTA CELL 2 (Não Deletar)",
        "consume": 0,
        "ativo_name": "YOKOTA CELL 2 (Não Deletar)",
        "producer": "",
        "fuel": "2",
        "color": "azul"
      }
    },
    {
      "speed": {
        "val": 0,
        "unit_measurement": "km/h"
      },
      "direction": 114,
      "dt_gps": "06/10/2022 23:26:37",
      "ignition": 0,
      "validate": 0,
      "client_id": 22647,
      "lat_lng": [
        -22.212137,
        -49.728982
      ],
      "is_bloqued": 1,
      "ativo_id": 619130,
      "ativo": {
        "type": 1,
        "horimeter": 0,
        "odometer": 0,
        "model": "",
        "plate": "DMQ-1077",
        "description": "DMQ-1077",
        "consume": 0,
        "ativo_name": "Palio",
        "producer": "Acura",
        "fuel": "1",
        "color": ""
      }
    },
  ])
  const { t } = useTranslation();
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

  const [searchValue, setSearchValue ] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);
  }
  
  const handleSearch = () => console.log(searchValue);

    const handleToggleSidebar = () => {
      const ne = !resizeMap
      setResizeMap(previous => !previous);
      console.log(ne)
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
            {vehicles.map((vehicle: IVehicle) => 
                <DividerBox>
                  <VehicleCard vehicle={vehicle}></VehicleCard>
                </DividerBox>
            )}
            
          </VehiclesCardsContainer>
            <MapControl />  
        </Sidebar>
      </SideBarContainer>
     <MapContainer>
        <Map 
          apikey="aXUSISrcnZnWoa7594NLwAB_s881RBkkEXwxXGNMn1A"
          vehicles={vehicles}
        /> 
     </MapContainer>
      
    </StyledDiv>
  )
}
