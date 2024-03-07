import Avatar from "../Avatar/Avatar";
import NavButton from "../NavButton";
import SelectLanguage from "../SelectLanguage";
import { StyledNav } from "./style";

export default function Navbar() {
    return (
        <StyledNav>
            <SelectLanguage />
            <div>
                <NavButton icon="support"/>
                <NavButton icon="question"/>
            </div>
            <Avatar />
        </StyledNav>
    );
}