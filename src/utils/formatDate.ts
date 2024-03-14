import moment from "moment";

export default function formatDate(date: string): string {

    const currentDate = moment();
    const newDate = moment(date, "DD/MM/YYYY HH:mm:ss");
    const daysDiff = currentDate.diff(newDate, "days");
     
    //verifica se foi na data atual para retornar no formato "há 3 minutos atrás."
    if(daysDiff === 0) {
        return newDate.fromNow();
    }
    
    return `${newDate.format(`DD/MM/YYYY [${preposition()}] HH:mm`)}`;
}

function preposition() {
    const locale = moment.locale();

    const preposition = locale === "en" ? "at" : locale === "es" ? "a las" : "ás";

    return preposition;
}