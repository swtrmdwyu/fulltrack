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
  user-select:none; 
`;

export const MenuContainer = styled.div`
  grid-area: menu;
`;

export const NavContainer = styled.div`
  grid-area: navbar;
`;

export const SideBarContainer = styled.div`
  grid-area: sidebar;
  display: flex;
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

export const LoadingContainer = styled.div`
    align-items: center;
    display: flex;
    height: calc(100vh -  8.126rem);
    justify-content: center ;
`;

