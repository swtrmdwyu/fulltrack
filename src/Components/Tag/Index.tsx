import TagType from "../../types/TagType";
import SVGIcons from "../SVGIcons/SVGIcons";
import { StyledTag } from "./style";


export interface TagProps {
    type?: TagType,
    text?: string,
}



export default function Tag({ text, type }: TagProps) {
    const icon = {
        "ignition-moving": <SVGIcons name="line-arrow-right" size="16"></SVGIcons>,
        "ignition-stopped": <SVGIcons name="minus" size="16"></SVGIcons>,
        "ignition-off": <SVGIcons name="moon" size="16"></SVGIcons>,
        "speed-moving": "",
        "speed-stopped": "",
        "badge-fance-on": <SVGIcons name="face-on" size="16"></SVGIcons>,
        "badge-no-signal": <SVGIcons name="no-signal" size="16"></SVGIcons>,
        "badge-block": <SVGIcons name="lock" size="16"></SVGIcons>,
        "sensor-cool": "",
        "battery-good": <SVGIcons name="battery" size="16"></SVGIcons>,
        "battery-attention": <SVGIcons name="battery" size="16"></SVGIcons>,
        "battery-danger": <SVGIcons name="battery" size="16"></SVGIcons>,
        "driver": <SVGIcons name="user-profile" size="16"></SVGIcons>
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