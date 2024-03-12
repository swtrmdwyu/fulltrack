import { useState } from "react";
import { StyledSelect } from "./style";
import i18next from "i18next";
import checkUserLanguage from "../../utils/checkUserlanguage";

export default function SelectLanguage() {
    const userLanguage = checkUserLanguage();
    const [ language, setlanguage ] = useState(userLanguage);

    const selectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = event.target.value;
        setlanguage(newLanguage);
        i18next.changeLanguage(newLanguage);
    }
    
    return(
        <StyledSelect value={language} onChange={selectLanguage}>
            <option value="pt">PT</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
        </StyledSelect>
    )
}