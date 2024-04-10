import Button from "../Button";
import DividerBox from "../DividerBox";
import Input from "../Input";
import { BarContainer, CloseButton, RefButtonsContainer, RefContainer, RefSidebarContainer } from "./style";
import close from "../../assets/icons/close-side.svg";
import { useTranslation } from "react-i18next";
import Select from "../Select";
import React, { useState } from "react";
import Client from "../../interfaces/Client";
import SelectColor from "../SelectColor";

interface RefSidebarProps {
  	/** 
	 * Executada quando o botão de fechar ou o de cancelar forem clicados.
	*/
    onClose?: () => void,
	/** 
	 * Chamada quando o input de descrição mudar seu valor.
	 */
    onDescChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
	/** 
	 * Chamada quando o input de cliente mudar seu valor.
	 */
	onClientChange?: (client?: string) => void,
	/** 
	 * Chamada quando o botão salvar for clicado.
	 */
    onSave?: () => void,
	/**
	 * Lista com os clientes do select de clientes.
	 */
	clients?: Client[],
}

export default function RefSidebar({ onClose, onSave, onClientChange, onDescChange, clients } : RefSidebarProps) {
    const { t } = useTranslation();

	const [client, setClient] = useState("");
	const [isSearching, setIsSearching] = useState(false);

	const clientsNames = clients?.map((client) => client.client_description);
	const sortedClients = clientsNames?.sort((a, b) => 
		a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())
	);

	const clientsList = (): string[] => {

		if(!sortedClients) {
			return ["Nenhum cliente disponivel"]
		}

		if(!isSearching) {
			return sortedClients;
		}

		const searchClientResults = sortedClients.filter((clientSearch: string) => 
			clientSearch.toLocaleLowerCase().includes(client.toLocaleLowerCase())
		);

		if(searchClientResults.length > 0) {
			return searchClientResults;
		}

		return sortedClients;
	}

	const handleChangeClient = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newClient = event.target.value;
		setIsSearching(true);
		setClient(newClient);

		if(onClientChange) onClientChange(newClient);
	}

	const handleSetClient = (value: string) => {
		setIsSearching(false);
		setClient(value);

		if(onClientChange) onClientChange(value);
	}

	const handleSetColor = () => {
		
	}


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
				options={clientsList()}
				onSetValue={handleSetClient}
				value={client}
				onChange={handleChangeClient}
			/>

			<SelectColor setColor={() => {}}/>

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