import TagType from "../../types/TagType";
import SVGIcons from "../SVGIcons/SVGIcons";
import { StyledTag } from "./style";


export interface TagProps {
    /**
     * Define o texto exibido dentro da tag.
     */
    text?: string,
    /**
     * Define qual é a varição de tema da tag.
     */
    type?: TagType,
}



export default function Tag({ text, type }: TagProps) {
    const icon = {
        "ignition-moving": <SVGIcons name="line-arrow-right" size="16" />,
        "ignition-stopped": <SVGIcons name="minus" size="16" />,
        "ignition-off": <SVGIcons name="moon" size="16" />,
        "speed-moving": "",
        "speed-stopped": "",
        "badge-fance-on": <SVGIcons name="face-on" size="16" />,
        "badge-no-signal": <SVGIcons name="no-signal" size="16" />,
        "badge-block": <SVGIcons name="lock" size="16" />,
        "sensor-cool": "",
        "battery-good": <SVGIcons name="battery" size="16" />,
        "battery-attention": <SVGIcons name="battery" size="16" />,
        "battery-danger": <SVGIcons name="battery" size="16" />,
        "driver": <SVGIcons name="user-profile" size="16" />
    }
    
    return (
        <StyledTag
            type={type}
        >
            {type && icon[type]}
            {text}
        </StyledTag>
    )
}