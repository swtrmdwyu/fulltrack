import { useState } from "react";
import { StyledSelect } from "./style";
import i18next from "i18next";
import checkUserLanguage from "../../utils/checkUserlanguage";
import moment from "moment";

export default function SelectLanguage() {
    const userLanguage = checkUserLanguage();
    const [ language, setLanguage ] = useState(userLanguage);

    const selectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = event.target.value;
        setLanguage(newLanguage);
        i18next.changeLanguage(newLanguage);
        console.log(newLanguage)
        moment.locale(newLanguage)
    }
    
    return(
        <StyledSelect value={language} onChange={selectLanguage}>
            <option value="pt-br">PT</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
        </StyledSelect>
    )
}