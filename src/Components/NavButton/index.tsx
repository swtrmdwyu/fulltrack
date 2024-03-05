import { StyledButton } from "./style";
import supportHeadphone from "../../assets/icons/support-headphones.svg";
import question from "../../assets/icons/question.svg";

interface NavButtonProps {
    icon?: "support" | "question"
    onClick?: () => void
}

export default function NavButton({ icon, onClick }: NavButtonProps) {
    return(
        <StyledButton
            onClick={onClick}
        >
            {icon && <img src={icon === "support" ? supportHeadphone : question} alt="" />}
        </StyledButton>
    )
}