import Button from "../Button";
import DividerBox from "../DividerBox";
import Input from "../Input";
import { BarContainer, CloseButton, RefButtonsContainer, RefContainer, RefSidebarContainer } from "./style";
import close from "../../assets/icons/close-side.svg";
import { useTranslation } from "react-i18next";

interface RefSidebarProps {
  	/** 
	 * Executada quando o botão de fechar ou o de cancelar forem clicados.
	*/
    onClose?: () => void,
	/** 
	 * Chamada quando o input de descrição mudar seu valor.
	 */
    onDescChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	/** 
	 * Chamada quando o botão salvar for clicado.
	 */
    onSave?: () => void,
}

export default function RefSidebar({ onClose, onSave, onDescChange } : RefSidebarProps) {
    const { t } = useTranslation();

    return(
        <RefSidebarContainer>
            <DividerBox>
            <BarContainer>
              <CloseButton onClick={onClose}><img src={close} /></CloseButton>
              <span>{t("reference_point.label")}</span>
            </BarContainer>
          </DividerBox>
          <RefContainer>
            <Input 
				placeholder={t("add_object.description")} 
				onChange={onDescChange} 
				label={t("add_object.description")} 
			/>
           
          </RefContainer>
          <RefButtonsContainer>
                <Button 
					type="click" 
					onClick={onClose} 
					theme="secondary"
				>
					{t("add_object.button_cancel")}
				</Button>
				
                <Button 
					type="click" 
					onClick={onSave} 
					theme="primary"
				>
					{t("add_object.button_save")} 
				</Button>
            </RefButtonsContainer>
        </RefSidebarContainer>
    );
}