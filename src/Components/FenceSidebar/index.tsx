import Button from "../Button";
import DividerBox from "../DividerBox";
import Input from "../Input";
import { BarContainer, CloseButton, FenceButtonsContainer, FenceContainer, FenceSidebarContainer } from "./style";
import close from "../../assets/icons/close-side.svg";
import { useTranslation } from "react-i18next";

interface FenceSidebarProps {
    /**
     * Acionada quando o botão de fechar ou cancelar forem clicados.
     */
    onClose?: () => void,
    /**
     * Executa quando o valor do input de descrição mudar.
     */
    onDescChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    /**
     * Acionada o botão de salvar for clicado.
     */
    onSave?: () => void
}

export default function FenceSidebar({ onClose, onDescChange, onSave } : FenceSidebarProps) {
    const { t } = useTranslation();

    return(
        <FenceSidebarContainer>
            <DividerBox>
            <BarContainer>
              <CloseButton onClick={onClose}><img src={close} /></CloseButton>
              <span>{t("fence.label")}</span>
            </BarContainer>
          </DividerBox>
          <FenceContainer>
            <Input placeholder={t("add_object.description")} onChange={onDescChange} label={t("add_object.description")} />
           
          </FenceContainer>
          <FenceButtonsContainer>
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
            </FenceButtonsContainer>
        </FenceSidebarContainer>
    );
}