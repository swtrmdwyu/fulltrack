import { useState } from "react";
import MenuLink from "../../interfaces/IMenuLink";
import Vehicle from "../../interfaces/IVehicle";
import Navbar from "../../Components/Navbar";
import Menu from "../../Components/Menu";
import Sidebar from "../../Components/Sidebar";
import DividerBox from "../../Components/DividerBox";
import Searchbar from "../../Components/Searchbar";
import VehicleCard from "../../Components/VehicleCard";
import { Cluster } from "../../Components/Cluster";
import VehicleMarker from "../../Components/VehicleMarker";
import Map from "../../Map";
import { MapContainer, MenuContainer, NavContainer, SideBarContainer, StyledDiv, VehiclesCardsContainer } from "./style";
import '../../i18n/config';
import { useTranslation } from 'react-i18next'
import formatDate from "../../utils/formatDate";

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

export default function Home() {
  const { t } = useTranslation();

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

              <div>
                <p>{t('title', { name: 'John' })}</p>
                <p>{t('description.part1')}</p>
                <p>{t('description.part2')}</p>

              </div>

            <p>
              {formatDate("11/03/2024 15:41:01")}
            </p>
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
