import TagType from "../../types/TagType";
import { StyledTag } from "./style";


export interface TagProps {
    type?: TagType,
    text?: string,
}

export default function Tag({ text, type }: TagProps) {
    return (
        <StyledTag
            type={type}
        >
            {text}
        </StyledTag>
    )
}