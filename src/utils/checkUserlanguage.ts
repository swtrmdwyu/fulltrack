export default function checkUserLanguage(): string {
    const languages = ["pt", "pt-BR", "es", "en"];
    const userLanguage = navigator.language;

    if(!languages.includes(userLanguage)) {
        return "en";
    }

    return userLanguage;
}