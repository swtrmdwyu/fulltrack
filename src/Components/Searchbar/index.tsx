import { SearchbarContainer } from "./style";
import searchLoupe from "../../assets/icons/search-loupe.svg";

export interface SearchbarProps {
    /**
     * Função chamada quando a tecla "Enter" pressionada na barra de pesquisa.
     */
    handleSearch?: () => void,
    /**
     * Função que controla que controla as alterações dentro feitas na barra de pesquisa.
     */
    onChange?: (arg1: React.ChangeEvent<HTMLInputElement>) => void,
    /**
     * Atribui um valor ao placeholder da barra de pesquisa.
     */
    placeholder?: string,
    /**
     * Define o valor da barra de pesquisa.
     */
    value?: string,
}

export default function Searchbar({ handleSearch, onChange, placeholder, value }: SearchbarProps) {

    // verifica se a tecla enter foi pressionada para efetuar a pesquisa.
    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.code !== "Enter") {
            return;
        }

        if(handleSearch) handleSearch();
    }

    return(
        <SearchbarContainer>
            <input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                type="search"
                onKeyDown={handleOnKeyDown}
            />
            <img src={searchLoupe} />
        </SearchbarContainer>
    );
}