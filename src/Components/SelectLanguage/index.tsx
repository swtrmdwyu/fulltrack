import { useContext } from "react";
import { StyledSelect } from "./style";
import { LanguageContext } from "../../Contexts/LanguageContext";
import LanguageType from "../../types/LanguageType";

export default function SelectLanguage() {
    const {language, changeLanguage} = useContext(LanguageContext);

    // Define a nova linguagem da aplicação.
    const selectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = event.target.value as LanguageType;
        changeLanguage(newLanguage);
    }
    
    return(
        <StyledSelect value={language} onChange={selectLanguage}>
            <option value="pt-br">PT</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
        </StyledSelect>
    )
}