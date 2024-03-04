import styled from "styled-components"
import "./styles/variables.css";
// import Map from "./Map";
import Menu from "./Components/Menu";
import { MenuLink } from "./types/MenuLink";

const StyledDiv = styled.div`
  background-color: $primary-color;
  height: 100vh;
  width: 100%;
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
      <Menu 
        menuLinks={menu}
      />
      {/* <Map 
        apikey="aXUSISrcnZnWoa7594NLwAB_s881RBkkEXwxXGNMn1A"
      /> */}
    </StyledDiv>
  )
}
