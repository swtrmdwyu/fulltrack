import { createContext, useEffect, useState } from "react";
import LanguageType from "../types/LanguageType";
import i18next from "i18next";
import moment from "moment";
import "moment/dist/locale/es";
import "moment/dist/locale/pt-br";

interface LanguageContextType {
    changeLanguage: (lang: LanguageType) => void,
    language: LanguageType
}

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

const LanguageProvider =({ children }: { children: React.ReactNode}) => {
    const userLanguage = checkUserLanguage();
    const [language, setLanguage] = useState<LanguageType>(userLanguage);

    useEffect(() => {
        i18next.changeLanguage(language);
        moment.locale(language);
    }, [language])
   
    const changeLanguage = (lang: LanguageType) => {
        setLanguage(lang);
    }

    function checkUserLanguage(): LanguageType {
        const languages = ["pt-BR", "es", "en"];
        const userLanguage = navigator.language;
    
        if(userLanguage === "pt") {
            return "pt-br";
        }
    
        if(!languages.includes(userLanguage)) {
            return "en";
        }
    
        return userLanguage.toLocaleLowerCase() as LanguageType;
    }

    return (
        <LanguageContext.Provider value={{language, changeLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
}

export {LanguageContext, LanguageProvider};