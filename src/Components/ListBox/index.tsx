import { useRef, useState } from "react";
import { Box, DropList, ListBoxContainer, StyledInput } from "./style";
import close from "../../assets/icons/close.svg";
import calcTextSize from "../../utils/calcTextSize";

interface Option {
    key: string,
    value: string
}

interface ListBoxProps {
   options:  Option[],
   label?: string
}

export default function ListBox({ options, label }: ListBoxProps) {
    const [items, setItems] = useState<Option[] | []> ([]);

    const [inputSize, setInputSize] = useState(1);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [showNewTag, setShowNewTag] = useState(false);
    const [newTagText, setNewTagText] = useState("");

    const onInputChangge = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        const textStyle = '600 16px Inter';
        const newTextSize = calcTextSize(value, textStyle, "rem");

        setNewTagText(value);
        
        if(newTextSize < 1) {
            setInputSize(1);
            return;
        }

        if(newTextSize >= 18.7) {
            return;
        }

        setInputSize(newTextSize);
    }


    const onBoxClick = () => {

        if(!showNewTag) {
            setShowNewTag(true);
            setInputSize(1);
        }
        
        setTimeout(() => {
            if(inputRef.current) inputRef.current.focus();
        }, 400);
    }

    const onRemoveClick = (event: React.MouseEvent<HTMLImageElement>, value: string) => {
        event.stopPropagation();
        
        const newItems = items.filter((item: Option) => item.value !== value);
        console.log(value)
        console.log(newItems)
        setItems([...newItems]);
    }

    const handleNewTagKeyPress= (event: React.KeyboardEvent<HTMLInputElement>) => {

        if(event.code.toUpperCase() !== "ENTER") {
            return;
        }

        handleSaveNewTag({
            key: event.currentTarget.value,
            value: ""
        })
    }

    const handleSaveNewTag = (option: Option) => {
        setItems([...items, option]);
        setNewTagText("");
    }

    const handleCancelNewTag = (event: React.MouseEvent<HTMLImageElement>) => {
        event.stopPropagation();
        setShowNewTag(false);
        setNewTagText("");
    }
    
    const cancelPropagation = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
    }

    return (
        <ListBoxContainer 
        onClick={onBoxClick}>
            <label>{label}</label>
            <Box>
                {items.map((item: Option) => (
                    <span 
                        key={item.value}
                        onClick={cancelPropagation}
                    >
                        {item.key} 
                        <img 
                            src={close}
                            onClick={(event) => {onRemoveClick(event, item.value)}}
                        />
                    </span>
                ))}
                {
                    showNewTag && 
                    <span>
                        <StyledInput 
                            ref={inputRef}
                            type="text"
                            onChange={onInputChangge}
                            size={inputSize}
                            onKeyUp={handleNewTagKeyPress}

                            value={newTagText}
                        />
                        <img src={close} onClick={handleCancelNewTag}/>
                    </span>
                }
                
            </Box>

            <DropList>
                <ul>
                    {options.map((option: Option) => (
                        <li>{option.key} </li>
                    ))}
                </ul>
            </DropList>
        </ListBoxContainer>
    );
}