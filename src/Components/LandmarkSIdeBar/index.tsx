import Button from "../Button";
import DividerBox from "../DividerBox";
import Input from "../Input";
import close from "../../assets/icons/close-side.svg";
import { useTranslation } from "react-i18next";
import Select from "../Select";
import React, { useContext, useEffect, useState } from "react";
import Client from "../../interfaces/Client";
import SelectColor from "../SelectColor";
import { LandmarkContext } from "../../Contexts/LandmarkContext";
import { BarContainer, CloseButton, LandmarkButtonsContainer, LandmarkContainer, LandmarkSidebarContainer } from "./style";

interface LandmarkSidebarProps {
  	/** 
	 * Executada quando o botão de fechar ou o de cancelar forem clicados.
	*/
    onClose?: () => void,
	/** 
	 * Chamada quando o botão salvar for clicado.
	 */
    onSave?: () => void,
	/**
	 * Lista com os clientes do select de clientes.
	 */
	clients: Client[] | [],
}

export default function LandmarkSidebar({ onClose, onSave, clients } : LandmarkSidebarProps) {
    const { t } = useTranslation();
	const { 
		setCurrentColor,
		setCurrentLandmarkDescription, 
		setCurrentlandmarkClient,
		setCurrentCanSaveLandmark
	} = useContext(LandmarkContext);

	const [clientOptions, setClientOptions] = useState<{ key: string, value: string }[]>(formatedOptions(clients));

	function formatedOptions(clients: Client[]): {key: string, value: string}[] {
		const options = clients.map((option: Client) => {
			return {
				key: option.client_description,
				value: option.client_id.toString()
			}
		});

		if(options.length === 0) {
			return [{
				key: "Nenhum cliente disponível",
				value: ""
			}]
		}

		return options;
	}

	const [clientValue, setClientValue] = useState("");

	const onClientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setClientValue(value);
		const newOptions = clients.filter((client: Client) => 
			client.client_description.toLocaleLowerCase().includes(value.toLocaleLowerCase()));

		if(newOptions.length === 0) {
			setClientOptions([{
				key: "Nenhum cliente disponível",
				value: ""
			}]);
		}

		const op = formatedOptions(newOptions)

		setClientOptions(op);
	}

	const handleSetClient = (value: string) => {
		const client = clients.filter((client: Client) => client.client_id.toString() === value);
		if(client.length === 0) {	
			return;
		}
		setClientValue(client[0].client_description);
		setCurrentlandmarkClient(client[0]);
	}


	const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const description = event.target.value;
		setCurrentLandmarkDescription(description);
	}

	const handleLandmarkSave = () => {
		setCurrentCanSaveLandmark(true);
		
		if(onSave) onSave();
	}

    return(
        <LandmarkSidebarContainer>
            <DividerBox>
            <BarContainer>
              <CloseButton onClick={onClose}><img src={close} /></CloseButton>
              <span>{t("Landmarkerence_point.label")}</span>
            </BarContainer>
          </DividerBox>
          <LandmarkContainer>
            <Input 
				placeholder={t("reference_point.description_placeholder")}
				onChange={onDescriptionChange} 
				label={t("add_object.description")}
			/>

			<Select 
				label={t("Cliente")}
				options={clientOptions}
				onSetValue={handleSetClient}
				value={clientValue}
				onChange={onClientChange}
			/>

			<SelectColor setColor={setCurrentColor}/>

			<LandmarkButtonsContainer>				
                <Button 
					type="click" 
					onClick={handleLandmarkSave} 
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
            </LandmarkButtonsContainer>
          </LandmarkContainer>
        </LandmarkSidebarContainer>
    );
}