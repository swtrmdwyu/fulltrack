import styled from "styled-components";

export const StyledDiv = styled.div`
  display: grid;
  grid-template-areas:
    "menu navbar navbar"
    "menu sidebar map"
  ;
  grid-template-columns: auto auto 1fr;
  height: 100vh;
  width: 100%;
`;

export const MenuContainer = styled.div`
  grid-area: menu;
`;

export const NavContainer = styled.div`
  
  grid-area: navbar;
`;

export const SideBarContainer = styled.div`
  grid-area: sidebar;
`;

export const MapContainer = styled.div`
  grid-area: map;
`;

export const VehiclesCardsContainer = styled.div`
    max-height: calc(100vh -  8.126rem);
    overflow-x: hidden;
    overflow-y: auto;
    white-space: nowrap;
`;