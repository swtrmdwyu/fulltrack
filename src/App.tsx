import styled from "styled-components"
import "./styles/variables.css";
import Map from "./Map";

const StyledDiv = styled.div`
  background-color: $primary-color;
  height: 100vh;
  width: 100%;
`

export default function App() {
  return (
    <StyledDiv>
      <Map 
        apikey="aXUSISrcnZnWoa7594NLwAB_s881RBkkEXwxXGNMn1A"
      />
    </StyledDiv>
  )
}
