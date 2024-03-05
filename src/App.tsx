import styled from "styled-components"
import "./styles/variables.css";
// import Map from "./Map";
import Menu from "./Components/Menu";
import { MenuLink } from "./types/MenuLink";
import Navbar from "./Components/Navbar";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  width: 100%;

`

const MenuContainer = styled.div`
  grid-column: 1;
  grid-row: 1 / 2;
`

const NavContainer = styled.div`
  grid-column: 2;
`


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
      
      {/* <Map 
        apikey="aXUSISrcnZnWoa7594NLwAB_s881RBkkEXwxXGNMn1A"
      /> */}
    </StyledDiv>
  )
}
