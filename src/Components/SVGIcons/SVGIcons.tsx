import IconName from "../../types/Icon";

interface SVGIconsProps {
    /**
     * Define a cor de preenchimento do ícone.
     */
    fill?: string,
    /**
     * Nome do ícone para ser renderizado
     */
    name: IconName,
    /**
     * Define o tamanho do ícone.
     */
    size?: string
}

export default function SVGIcons({
    fill = "var(--quartiary-color)",
    name,
    size = "24"
}: SVGIconsProps) {
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

            case "face-on":
                return(
                    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.33248 4.6665V11.3332" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.6671 11.3332V4.6665" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.3325 14.0002H11.9992C11.6312 14.0002 11.3325 13.7015 11.3325 13.3335V12.0002C11.3325 11.6322 11.6312 11.3335 11.9992 11.3335H13.3325C13.7005 11.3335 13.9992 11.6322 13.9992 12.0002V13.3335C13.9992 13.7015 13.7005 14.0002 13.3325 14.0002Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.00012 14.0002H2.66679C2.29879 14.0002 2.00012 13.7015 2.00012 13.3335V12.0002C2.00012 11.6322 2.29879 11.3335 2.66679 11.3335H4.00012C4.36812 11.3335 4.66679 11.6322 4.66679 12.0002V13.3335C4.66679 13.7015 4.36812 14.0002 4.00012 14.0002Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.3325 4.66667H11.9992C11.6312 4.66667 11.3325 4.368 11.3325 4V2.66667C11.3325 2.29867 11.6312 2 11.9992 2H13.3325C13.7005 2 13.9992 2.29867 13.9992 2.66667V4C13.9992 4.368 13.7005 4.66667 13.3325 4.66667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.00012 4.66667H2.66679C2.29879 4.66667 2.00012 4.368 2.00012 4V2.66667C2.00012 2.29867 2.29879 2 2.66679 2H4.00012C4.36812 2 4.66679 2.29867 4.66679 2.66667V4C4.66679 4.368 4.36812 4.66667 4.00012 4.66667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.6665 12.6668H11.3332" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.3332 3.33333H4.6665" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                );
            
            case "line-arrow-right":
                return (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.6654 5.0013H1.33203" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.33203 8.33333L10.6654 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.33203 1.66797L10.6654 5.0013" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                );

            case "no-signal":
                return (
                    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                        <path d="M7.99945 12.8333C7.86145 12.8333 7.74945 12.9453 7.75079 13.0833C7.75012 13.2213 7.86212 13.3333 8.00012 13.3333C8.13812 13.3333 8.25012 13.2213 8.25012 13.0833C8.25012 12.9453 8.13812 12.8333 7.99945 12.8333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 13.3333L12.6667 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.41103 6.25871C7.1877 5.84004 4.78637 6.41871 3.06104 8.00071" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.6761 3.29613C8.13608 2.03546 3.93208 2.67079 1.06274 5.20279" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.5118 6.99854C12.0218 7.26853 12.5032 7.59987 12.9392 8.00053" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.6136 4.24854C14.0756 4.53187 14.5243 4.83987 14.937 5.2032" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.50806 9.61816C10.0321 9.81883 10.5241 10.1275 10.9467 10.5475" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                );

            case "user-profile":
                return (
                    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.60952 6.78603C7.13022 7.30673 7.13022 8.15095 6.60952 8.67165C6.08882 9.19235 5.2446 9.19235 4.7239 8.67165C4.2032 8.15095 4.2032 7.30673 4.7239 6.78603C5.2446 6.26533 6.08882 6.26533 6.60952 6.78603" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 7.33333H12.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 9.66683H10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.00004 12.0277C7.88671 11.743 7.71137 11.487 7.48604 11.2783V11.2783C7.10537 10.9257 6.60537 10.729 6.08604 10.729H5.24737C4.72804 10.729 4.22804 10.925 3.84737 11.2783V11.2783C3.62204 11.4863 3.44671 11.7423 3.33337 12.0277" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.66675 4.66683H7.33341C6.96541 4.66683 6.66675 4.36816 6.66675 4.00016V2.00016C6.66675 1.63216 6.96541 1.3335 7.33341 1.3335H8.66675C9.03475 1.3335 9.33341 1.63216 9.33341 2.00016V4.00016C9.33341 4.36816 9.03475 4.66683 8.66675 4.66683Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.66671 3.3335H2.69404C1.94271 3.3335 1.33337 3.94283 1.33337 4.69416V12.6668C1.33337 13.4035 1.93004 14.0002 2.66671 14.0002H13.3334C14.07 14.0002 14.6667 13.4035 14.6667 12.6668V4.66683C14.6667 3.93016 14.07 3.3335 13.3334 3.3335H9.33337" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                );
            
            case "thunder":
                return (
                    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.64463 2L3.16663 9.33333H7.99996L7.35529 14L12.8333 6.66667H7.99996L8.64463 2Z" stroke="#26333B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                );

            case "moon": 
                return (
                    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.2632 8.68394C12.4832 8.58061 12.7179 8.79727 12.6566 9.03261C12.4472 9.83394 12.0359 10.5966 11.4026 11.2299C9.52189 13.1106 6.51322 13.1499 4.68122 11.3179C2.84922 9.48594 2.88922 6.47661 4.76989 4.59594C5.40322 3.96261 6.16522 3.55127 6.96722 3.34194C7.20255 3.28061 7.41855 3.51527 7.31589 3.73527C6.64789 5.16127 6.86722 6.86927 7.99855 8.00061C9.12922 9.13261 10.8372 9.35194 12.2632 8.68394V8.68394Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                );

            case "minus":
                return (
                    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.6667 8.00033H5.33337" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 14V14C4.686 14 2 11.314 2 8V8C2 4.686 4.686 2 8 2V2C11.314 2 14 4.686 14 8V8C14 11.314 11.314 14 8 14Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                );
            case "lock":
                return (
                    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.3334 14H4.66671C3.93004 14 3.33337 13.4033 3.33337 12.6667V7.33333C3.33337 6.59667 3.93004 6 4.66671 6H11.3334C12.07 6 12.6667 6.59667 12.6667 7.33333V12.6667C12.6667 13.4033 12.07 14 11.3334 14Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.00008 11.3932V9.6665" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.35355 8.81295C8.54881 9.00821 8.54881 9.32479 8.35355 9.52006C8.15829 9.71532 7.84171 9.71532 7.64645 9.52006C7.45118 9.32479 7.45118 9.00821 7.64645 8.81295C7.84171 8.61769 8.15829 8.61769 8.35355 8.81295" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.33337 6V4.66667V4.66667C5.33337 3.194 6.52737 2 8.00004 2V2C9.47271 2 10.6667 3.194 10.6667 4.66667V4.66667V6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                );

            case "battery" : {
                return (
                    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.3333 12H3.33333C2.59667 12 2 11.4033 2 10.6667V5.33333C2 4.59667 2.59667 4 3.33333 4H11.3333C12.07 4 12.6667 4.59667 12.6667 5.33333V10.6667C12.6667 11.4033 12.07 12 11.3333 12Z" stroke="#26333B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.5333 10L8.5333 8H6.1333L7.1333 6" stroke="#26333B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.6666 6H13.3426C13.446 6 13.548 6.024 13.6406 6.07067L13.9646 6.23267C14.1906 6.34533 14.3333 6.57667 14.3333 6.82867V9.17133C14.3333 9.424 14.1906 9.65467 13.9646 9.76733L13.6406 9.92933C13.548 9.976 13.446 10 13.3426 10H12.6666" stroke="#26333B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                );
            }
    }       

}