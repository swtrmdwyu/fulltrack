import Button from "../Button";
import DividerBox from "../DividerBox";
import Input from "../Input";
import { BarContainer, CloseButton, FenceButtonsContainer, FenceContainer, FenceSidebarContainer, MarkerIconContainer } from "./style";
import close from "../../assets/icons/close-side.svg";
import { useTranslation } from "react-i18next";
import SelectColor from "../SelectColor";
import { useContext } from "react";
import { FenceContext } from "../../Contexts/FenceContext";
import Client from "../../interfaces/Client";
import SelectClient from "../SelectClient";
import ListBox from "../ListBox";

interface FenceSidebarProps {
    /**
     * Acionada quando o botão de fechar ou cancelar forem clicados.
     */
    onClose?: () => void,
    /**
     * Acionada o botão de salvar for clicado.
     */
    onSave?: () => void,
    /**
     * Lista com os clientes.
     */
    clients: Client[] | []
}

export default function FenceSidebar({ onClose, onSave, clients } : FenceSidebarProps) {
    const { t } = useTranslation();

    const {
      setCurrentFenceColor, 
      setCurrentFenceDescription, 
      fenceDescription,
      changeFenceClient
    } = useContext(FenceContext);

    const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const description = event.target.value;
      setCurrentFenceDescription(description);
    }


    return(
        <FenceSidebarContainer>
            <DividerBox>
            <BarContainer>
              <CloseButton onClick={onClose}><img src={close} /></CloseButton>
              <span>{t("fence.label")}</span>
            </BarContainer>
          </DividerBox>
          <FenceContainer>

            <SelectClient 
              clients={clients}
              onSetClient={changeFenceClient}
            />

            <Input 
              placeholder={t("Local de referência")} 
              onChange={onDescriptionChange} 
              label={t("add_object.description")}
              value={fenceDescription}
            />

            <ListBox 
              label="Veículos" 
              options={[]}
            />

            <MarkerIconContainer>
              <label>Cor da cerca</label>
              <SelectColor setColor={setCurrentFenceColor}/>
            </MarkerIconContainer>
           
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