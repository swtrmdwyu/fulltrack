export default function checkUserLanguage(): string {
    const languages = ["pt-BR", "es", "en"];
    const userLanguage = navigator.language;

    if(userLanguage === "pt") {
        return "pt-br";
    }

    if(!languages.includes(userLanguage)) {
        return "en";
    }

    return userLanguage.toLocaleLowerCase();
}