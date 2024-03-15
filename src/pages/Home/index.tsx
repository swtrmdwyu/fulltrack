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

export default function Home() {
  const [resizeMap, setResizeMap] = useState(false)
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
    const vehicle: Vehicle = {
      speed: {
        val: 0,
        unit_measurement: "km/h"
      },
      direction: 0,
      dt_gps: "07/10/2022 06:32:01",
      ignition: 0,
      validate: 1,
      client_id: 22647,
      lat_lng: [
        -22.212162,
        -49.729614
      ],
      is_bloqued: 0,
      ativo_id: 45048,
      ativo: {
        type: 1,
        horimeter: 542155,
        odometer: 1963814,
        model: "sedan",
        plate: "CZE2042",
        description: "",
        consume: 12,
        ativo_name: "Parati Track Field",
        producer: "",
        fuel: "ga",
        color: "branco"
      }
    }

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
            <DividerBox>
              <VehicleCard vehicle={vehicle}></VehicleCard>
            </DividerBox>
          </VehiclesCardsContainer>

        </Sidebar>
      </SideBarContainer>
     <MapContainer>
        <Map 
          apikey="aXUSISrcnZnWoa7594NLwAB_s881RBkkEXwxXGNMn1A"
          resize={resizeMap}
        /> 
     </MapContainer>
      
    </StyledDiv>
  )
}
