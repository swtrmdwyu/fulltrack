import Button from "../Button";
import DividerBox from "../DividerBox";
import Input from "../Input";
import close from "../../assets/icons/close-side.svg";
import { useTranslation } from "react-i18next";
import React, { useContext } from "react";
import Client from "../../interfaces/Client";
import SelectColor from "../SelectColor";
import { LandmarkContext } from "../../Contexts/LandmarkContext";
import { 
	BarContainer, 
	CloseButton, 
	LandmarkButtonsContainer, 
	LandmarkContainer, 
	LandmarkSidebarContainer, 
	MarkerIconContainer 
} from "./style";

import SelectClient from "../SelectClient";

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
              <span>{t("reference_point.label")}</span>
            </BarContainer>
          </DividerBox>
          <LandmarkContainer>
            <Input 
				placeholder={t("reference_point.description_placeholder")}
				onChange={onDescriptionChange} 
				label={t("add_object.description")}
			/>

			<SelectClient 
              clients={clients}
              onSetClient={setCurrentlandmarkClient}
            />

			<Input 
				placeholder="Endereço"
				onChange={onDescriptionChange} 
				label={"Endereço"}
				value="Av. Pres. Vargas, 70 - Centro, Garça - SP, 17400"
			/>

			<MarkerIconContainer>
				<label>Ícone do marcador</label>
				<SelectColor setColor={setCurrentColor}/>
			</MarkerIconContainer>

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