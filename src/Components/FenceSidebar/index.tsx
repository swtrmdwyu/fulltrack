import Button from "../Button";
import DividerBox from "../DividerBox";
import Input from "../Input";
import { BarContainer, CloseButton, FenceButtonsContainer, FenceContainer, FenceSidebarContainer, MarkerIconContainer } from "./style";
import close from "../../assets/icons/close-side.svg";
import { useTranslation } from "react-i18next";
import SelectColor from "../SelectColor";
import { useContext } from "react";
import { FenceContext, FenceVehicle } from "../../Contexts/FenceContext";
import Client from "../../interfaces/Client";
import SelectClient from "../SelectClient";
import ListBox from "../ListBox";
import { FormatedVehicle } from "../../interfaces/FormatedVehicle";
import Option from "../../interfaces/Option";

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
    clients: Client[] | [],
    /**
     * Lista com os Veículos.
     */
    vehicles: FormatedVehicle[] | [],
}

export default function FenceSidebar({ onClose, onSave, clients, vehicles } : FenceSidebarProps) {
    const { t } = useTranslation();

    const {
      setCurrentFenceColor, 
      setCurrentFenceDescription, 
      fenceDescription,
      changeFenceClient,
      changeFenceVehicles
    } = useContext(FenceContext);

    const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const description = event.target.value;
      setCurrentFenceDescription(description);
    }

    const options: Option[] = vehicles.map((vehicle: FormatedVehicle) => {
      const option: Option = {
        key: vehicle.ativo.description,
        value: vehicle.ativo_id.toString()
      }

      return option;
    })

    const onAddFenceVehicle = (items: Option[]) => {
      const vehicles: FenceVehicle[] = items.map((item: Option) => {
        const vehicle: FenceVehicle = {
          ativo_name: item.key,
          ativo_id: parseInt(item.value)
        }

        return vehicle;
      });

      changeFenceVehicles(vehicles);
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
              onChangeItems={onAddFenceVehicle}
              label="Veículos" 
              placeholder="Clique para adicionar um veículo"
              options={options.length > 0 ? options : []}
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