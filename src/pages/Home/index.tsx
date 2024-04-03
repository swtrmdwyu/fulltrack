import { useContext, useEffect, useRef, useState } from "react";
import MenuLink from  "../../interfaces/MenuLink";
import Navbar from "../../Components/Navbar";
import Menu from "../../Components/Menu";
import Sidebar from "../../Components/Sidebar";
import DividerBox from "../../Components/DividerBox";
import Searchbar from "../../Components/Searchbar";
import VehicleCard from "../../Components/VehicleCard";
import { LoadingContainer, MapContainer, MenuContainer, NavContainer, SideBarContainer, StyledDiv, VehiclesCardsContainer } from "./style";
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
import SearchNotFound from "../../Components/SearchNotFound";
import Loading from "../../Components/Loading";
import FenceSidebar from "../../Components/FenceSidebar";


export default function Home() {
  const { t } = useTranslation();
  const {vehicles} = useGetvehicles();
  const {authTokens} = useContext(AuthContext);
  const [resizeMap, setResizeMap] = useState(false);
  const [searchValue, setSearchValue ] = useState("");
  const [formatedVehicles, setFormatedVehicles] = useState<FormatedVehicle[] | []>([]);
  const [searchResults, setSearchResults] = useState<FormatedVehicle[] | []>([]);

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
              });
                
              setFormatedVehicles(forrmatedVehicles.slice(0,30));
          }
      }
    }
      
    getAllData();
      
  }
}, [vehicles]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);
    
    const filteredVehicles = formatedVehicles?.filter((vehicle: FormatedVehicle) => 
      vehicle.ativo.ativo_name.toLowerCase().startsWith(newSearchValue.toLowerCase())
    );

    setSearchResults([...filteredVehicles]);
    
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
              placeholder={t("searchbar_placeholder")}
              value={searchValue}
              onChange={handleSearchChange}
              handleSearch={handleSearch}
            />
          </DividerBox>

          <VehiclesCardsContainer>
            {(formatedVehicles && !searchValue) && formatedVehicles.map((vehicle: FormatedVehicle) => 
                <DividerBox key={vehicle.ativo_id}>
                  <VehicleCard vehicle={vehicle}></VehicleCard>
                </DividerBox>
            )}

            {(formatedVehicles && searchValue) && searchResults.map((vehicle: FormatedVehicle) => 
                <DividerBox key={vehicle.ativo_id}>
                  <VehicleCard vehicle={vehicle}></VehicleCard>
                </DividerBox>
            )}
            {(searchValue && searchResults.length === 0) && <SearchNotFound />}
            {/* <LoadingContainer>
                <Loading />
            </LoadingContainer> */}
            
          </VehiclesCardsContainer>
        </Sidebar>
        {/* <FenceSidebar>AAAAAAAAAAAAAAAAAAAAA</FenceSidebar> */}
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
