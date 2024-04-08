import Button from "../Button";
import DividerBox from "../DividerBox";
import Input from "../Input";
import { BarContainer, CloseButton, RefButtonsContainer, RefContainer, RefSidebarContainer } from "./style";
import close from "../../assets/icons/close-side.svg";
import { useTranslation } from "react-i18next";
import Select from "../Select";
import React from "react";
import Client from "../../interfaces/Client";

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
	/**
	 * Lista com os clientes do select de clientes.
	 */
	clients?: Client[],
}

export default function RefSidebar({ onClose, onSave, onDescChange, clients } : RefSidebarProps) {
    const { t } = useTranslation();

	const clientsList = clients?.map((client) => client.client_description);


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
				placeholder={t("reference_point.description_placeholder")}
				onChange={onDescChange} 
				label={t("add_object.description")} 
			/>

			<Select 
				label={t("Cliente")}
				options={clientsList ? clientsList : ["Nenhum cliente existente"]}
			/>

			<RefButtonsContainer>				
                <Button 
					type="click" 
					onClick={onSave} 
					theme="primary"
				>
					{t("add_object.button_save")} 
				</Button>

				<Button 
					type="click" 
					onClick={onClose} 
					theme="tertiary"
				>
					{t("add_object.button_cancel")}
				</Button>
            </RefButtonsContainer>
          </RefContainer>

        </RefSidebarContainer>
    );
}