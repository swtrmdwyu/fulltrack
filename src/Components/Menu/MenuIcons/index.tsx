interface MenuIconsProps {
    /**
     * Define a cor de preenchimento do ícone.
     */
    fill?: string,
    /**
     * Nome do ícone para ser renderizado
     */
    name: string,
    /**
     * Define o tamanho do ícone.
     */
    size?: string
}

export default function MenuIcons({
    fill = "#FFFFFF",
    name,
    size = "24"
}: MenuIconsProps) {
    /**
     * Verifica qual o nome do ícone e retorna seu SVG correspondente.
     */
    switch(name) {
        case "dashboard":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1_1520)">
                        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 12V12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12V12" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 17C13.1046 17 14 16.1046 14 15C14 13.8954 13.1046 13 12 13C10.8954 13 10 13.8954 10 15C10 16.1046 10.8954 17 12 17Z" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 10V13" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_1_1520">
                        <rect width={size} height={size} fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
            );

        case "world":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3.10001C16.667 8.02701 16.667 15.973 12 20.9" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 20.9C7.33301 15.973 7.33301 8.02701 12 3.10001" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 3C16.982 3 21 7.018 21 12C21 16.982 16.982 21 12 21" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 21C7.018 21 3 16.982 3 12C3 7.018 7.018 3 12 3" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.51001 9H20.49" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.51001 15H20.49" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
        
        case "interface": 
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 10H5C3.895 10 3 9.105 3 8V5C3 3.895 3.895 3 5 3H8C9.105 3 10 3.895 10 5V8C10 9.105 9.105 10 8 10Z" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M19 10H16C14.895 10 14 9.105 14 8V5C14 3.895 14.895 3 16 3H19C20.105 3 21 3.895 21 5V8C21 9.105 20.105 10 19 10Z" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 21H5C3.895 21 3 20.105 3 19V16C3 14.895 3.895 14 5 14H8C9.105 14 10 14.895 10 16V19C10 20.105 9.105 21 8 21Z" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.5 15V20" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 17.5H15" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

            );
        
        case "chart":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M21 21L17 21L17 3L21 3L21 21Z" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M14 21.0002L10 21.0002L10 8.6842L14 8.6842L14 21.0002Z" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M7 21.0004L3 21.0004L3 14.3684L7 14.3684L7 21.0004Z" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );

        case "navigation":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.25 6L15.007 5.987C16.67 5.984 18.019 7.335 18.012 8.998V9.012C18.005 10.664 16.664 12 15.013 12H9.999C8.343 12 7 13.343 7 14.999V14.999C7 16.656 8.344 17.999 10.001 17.998L20 17.995" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 17.995L18.003 19.992" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.003 15.997L20 17.995" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.59099 4.40901C8.46967 5.28769 8.46967 6.71231 7.59099 7.59099C6.71231 8.46967 5.28769 8.46967 4.40901 7.59099C3.53033 6.71231 3.53033 5.28769 4.40901 4.40901C5.28769 3.53033 6.71231 3.53033 7.59099 4.40901" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );

        case "direction":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1_1566)">
                        <path d="M12.414 15.232L15.907 20.211C16.167 20.582 15.839 21.08 15.393 20.989L12.001 20.298L8.60503 20.989C8.16003 21.079 7.83303 20.583 8.09303 20.213L11.587 15.232C11.788 14.946 12.213 14.946 12.414 15.232V15.232Z" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 18L18 5" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 18L6 5" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 3V5" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 9V11" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1_1566">
                        <rect width={size} height={size} fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            );

            case "briefcase":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.0029 21.0038H4.99705C3.89202 21.0038 2.99622 20.1079 2.99622 19.0029V9.99917C2.99622 8.89414 3.89202 7.99834 4.99705 7.99834H19.0029C20.1079 7.99834 21.0037 8.89414 21.0037 9.99917V19.0029C21.0037 20.1079 20.1079 21.0038 19.0029 21.0038Z" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.0017 21.0037V5.9975C16.0017 4.89247 15.1059 3.99667 14.0009 3.99667H9.99919C8.89416 3.99667 7.99835 4.89247 7.99835 5.9975V21.0037" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );

            case "add":
                return(
                    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8V16" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 12H8" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 21V21C7.029 21 3 16.971 3 12V12C3 7.029 7.029 3 12 3V3C16.971 3 21 7.029 21 12V12C21 16.971 16.971 21 12 21Z" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                );

            case "settings":
                return(
                    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.8003 2.99625C13.2224 2.99625 13.599 3.26128 13.7417 3.65853L14.2499 5.07412C14.3306 5.29672 14.4872 5.48376 14.6921 5.60234L16.1997 6.4727C16.4045 6.59082 16.6444 6.63264 16.877 6.59075L18.3576 6.32364C18.7734 6.24804 19.1918 6.44184 19.4031 6.80784L20.2034 8.18841C20.4152 8.55342 20.3752 9.01208 20.1034 9.33489L19.132 10.4834C18.979 10.664 18.895 10.8929 18.8949 11.1296V12.8704C18.895 13.1071 18.979 13.336 19.132 13.5166L20.1034 14.6651C20.3752 14.9879 20.4152 15.4466 20.2034 15.8116L19.4031 17.1922C19.192 17.5578 18.7741 17.7515 18.3586 17.6764L16.878 17.4093C16.6454 17.3674 16.4055 17.4092 16.2007 17.5273L14.6931 18.3977C14.4882 18.5162 14.3316 18.7033 14.2509 18.9259L13.7427 20.3415C13.5999 20.7391 13.2228 21.0041 12.8003 21.0037H11.1997C10.7776 21.0037 10.4009 20.7387 10.2583 20.3415L9.75005 18.9259C9.66941 18.7036 9.51326 18.5166 9.30887 18.3977L7.80024 17.5273C7.59551 17.4092 7.35557 17.3674 7.12296 17.4093L5.64234 17.6764C5.22657 17.752 4.80814 17.5582 4.5969 17.1922L3.79657 15.8116C3.58477 15.4466 3.62479 14.9879 3.89661 14.6651L4.86802 13.5166C5.02101 13.336 5.10502 13.1071 5.10512 12.8704V11.1296C5.10502 10.8929 5.02101 10.664 4.86802 10.4834L3.90662 9.33489C3.6348 9.01208 3.59477 8.55342 3.80657 8.18841L4.60691 6.80784C4.81801 6.44223 5.23591 6.24849 5.65134 6.32364L7.13196 6.59075C7.36458 6.63264 7.60451 6.59082 7.80924 6.4727L9.31787 5.60234C9.52227 5.48338 9.67841 5.29643 9.75905 5.07412L10.2673 3.65853C10.4088 3.26437 10.7809 3.00009 11.1997 2.99625H12.8003Z" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 14.7511C13.5194 14.7511 14.7511 13.5194 14.7511 12C14.7511 10.4806 13.5194 9.24886 12 9.24886C10.4806 9.24886 9.24884 10.4806 9.24884 12C9.24884 13.5194 10.4806 14.7511 12 14.7511Z" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                );
    }   

}