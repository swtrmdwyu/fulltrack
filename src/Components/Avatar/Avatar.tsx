import { StyledAvatar } from "./style";
import defaultAvatar from "../../assets/img/default-avatar.jpg"

export interface AvatarProps {
    /**
     * O URL da imagem de perfil do usuário.
     */
    src?: string,
}

export default function Avatar({ src }: AvatarProps) {
    return(
        <StyledAvatar 
            src={src ? src : defaultAvatar}
            alt="Avatar de perfil do usuário"
        />
    );
}