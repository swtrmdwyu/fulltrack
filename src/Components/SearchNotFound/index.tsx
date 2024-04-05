import { useTranslation } from "react-i18next";
import notFound from "../../assets/img/search-not-found.svg"
import { Container } from "./style";
import Button from "../Button";

export default function SearchNotFound() {
    const { t } = useTranslation();
    return(
        <Container>
            <img src={notFound} />
            <h2>{t("search_not_found.label")}</h2>
            <p>{t("search_not_found.paragraph")}</p>
            <div>
                <Button
                    type="click"
                    theme="primary"
                >
                    {t("search_not_found.button")}
                </Button>
            </div>          
        </Container>
    );
}