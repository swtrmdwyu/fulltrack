import styled from "styled-components"
import "./styles/variables.css";
import Map from "./Map";
import Menu from "./Components/Menu";
import MenuLink from "./interfaces/MenuLink";
import Navbar from "./Components/Navbar";
import Searchbar from "./Components/Searchbar";
import DividerBox from "./Components/DividerBox";
import VehicleCard from "./Components/VehicleCard";
import { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Vehicle from "./interfaces/Vehicle";
import VehicleMarker from "./Components/VehicleMarker";
import { Cluster } from "./Components/Cluster";

const StyledDiv = styled.div`
  display: grid;
  grid-template-areas:
    "menu navbar navbar"
    "menu sidebar map"
  ;
  grid-template-columns: auto auto 1fr;
  height: 100vh;
  width: 100%;
`;

const MenuContainer = styled.div`
  grid-area: menu;
`;

const NavContainer = styled.div`
  
  grid-area: navbar;
`;

const SideBarContainer = styled.div`
  grid-area: sidebar;
`;

const MapContainer = styled.div`
  grid-area: map;
`;


const VehiclesCardsContainer = styled.div`
    max-height: calc(100vh -  8.126rem);
    overflow-y: auto;
    white-space: nowrap;
`;
const menu: MenuLink[] = [
  { label: 'Dashboard', href: '#', icon: 'dashboard' },
  { label: 'Mapa geral', href: '#', icon: "world" },
  { label: 'Mosaico', href: '#', icon: "interface" },
  { label: 'Relatórios', href: '#', icon: "chart" },
  { label: 'Logística', href: '#', icon: "navigation" },
  { label: 'Driver behavior', href: '#', icon: "direction" },
  { label: 'Painel administrativo', href: '#', icon: "briefcase" },
  { label: 'Cadastros', href: '#', icon: "add" },
  { label: 'Configurações', href: '#', icon: "settings" },
];

export default function App() {
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
        <Sidebar>
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


          <DividerBox>
            <Cluster quantity={99}/>
          </DividerBox>

            <VehicleMarker type="no-signal"/>

        </Sidebar>
      </SideBarContainer>

     <MapContainer>
        <Map 
          apikey="aXUSISrcnZnWoa7594NLwAB_s881RBkkEXwxXGNMn1A"
        /> 
     </MapContainer>
      
    </StyledDiv>
  )
}
