import React, { createContext, useContext, useState } from "react";

interface LanguageProps {
    children: React.ReactNode,
    lang: "pt" | "pt-br" | "en" | "es",

}
const LanguageContext = createContext<LanguageProps | undefined>(undefined);

export const LanguageProvider = ({ children, lang }: LanguageProps) => {
  const [language, setLanguage] = useState("en"); 

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};


export const useLanguage = () => useContext(LanguageContext);