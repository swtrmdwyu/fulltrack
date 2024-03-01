import styled from "styled-components"
import './styles/_variables.scss'; 

const StyledDiv = styled.div`
  background-color: $primary-color;
  height: 100px;
  width: 100px;
`

export default function App() {
  return (
    <StyledDiv></StyledDiv>
  )
}
