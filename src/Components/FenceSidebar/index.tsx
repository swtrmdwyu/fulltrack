import Button from "../Button";
import DividerBox from "../DividerBox";
import Input from "../Input";
import { FenceButtonsContainer, FenceContainer, FenceSidebarContainer } from "./style";

interface FenceSidebarProps {
    onClose?: () => void,
    onSave?: () => void,
    onDescChange?: () => void
}
export default function FenceSidebar({ onClose, onSave, onDescChange } : FenceSidebarProps) {
    return(
        <FenceSidebarContainer>
            <DividerBox>
            <div>
              <button onClick={onClose}>X</button>
              <span>Adicionar Cerca</span>
            </div>
          </DividerBox>
          <FenceContainer>
            <Input placeholder="descrição" onChange={onDescChange}/>
           
          </FenceContainer>
          <FenceButtonsContainer>
                <Button type="click" onClick={onSave} theme="secondary">Cancelar</Button>
                <Button type="click" onClick={onSave} theme="secondary">Cadastrar</Button>
            </FenceButtonsContainer>
        </FenceSidebarContainer>
    );
}