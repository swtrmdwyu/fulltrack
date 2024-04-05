import IconName from "../types/IconName";

export default interface MenuLink {
    /**
     * Ícone a ser exibido junto ao link do menu.
     */
    icon?: IconName,
    /**
     * Texto para o link do menu.
     */
    label: string,
    /**
     * O URL para onde o link do menu aponta.
     */
    href: string,
}