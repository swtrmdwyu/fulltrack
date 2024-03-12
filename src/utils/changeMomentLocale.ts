import moment from "moment";
import "moment/dist/locale/pt";
import "moment/dist/locale/pt-br";
import "moment/dist/locale/es";


export default function changeMomentLocale(locale: string) {
    moment.locale(locale);
}