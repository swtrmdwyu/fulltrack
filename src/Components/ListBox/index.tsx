import { useEffect, useRef, useState } from "react";
import { Box, DropList, ListBoxContainer, StyledInput } from "./style";
import close from "../../assets/icons/close.svg";
import calcTextSize from "../../utils/calcTextSize";
import Option from "../../interfaces/Option";
import check from "../../assets/icons/check-gray.svg";


interface ListBoxProps {
   options:  Option[],
   label?: string,
   placeholder: string,
   onChangeItems: (items: Option[]) => void
}

export default function ListBox({ options, label, placeholder, onChangeItems }: ListBoxProps) {
    const [items, setItems] = useState<Option[] | []> ([]);

    const [inputSize, setInputSize] = useState(1);
    const [showNewTag, setShowNewTag] = useState(false);
    const [newTagText, setNewTagText] = useState("");
    const [showList, setShowList] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<Option[] | []>([])

    const inputRef = useRef<HTMLInputElement | null>(null);
    const listBoxRef = useRef<HTMLDivElement | null>(null);

    const onInputChangge = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        const textStyle = '500 14px Inter';
        const newTextSize = calcTextSize(value, textStyle, "rem");

        const matchedOptions = options.filter((option: Option) => option.key.toLowerCase().includes(value.toLocaleLowerCase()));

        setFilteredOptions([]);
        
        if(matchedOptions.length > 0 && value !== "") {
            setFilteredOptions([...matchedOptions]);
        }

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

    const onBoxClick = (event: React.MouseEvent<HTMLDivElement>) => {

        if(event.currentTarget !== event.target) {
            return;
        }

        if(!showNewTag) {
            setShowNewTag(true);
            setInputSize(1);
        }

        if(!showList) {
            setShowList(true);
        }
        
        setTimeout(() => {
            if(inputRef.current) inputRef.current.focus();
        }, 400);
    }

    const onRemoveClick = (event: React.MouseEvent<HTMLImageElement>, value: string) => {
        event.stopPropagation();
        
        const newItems = items.filter((item: Option) => item.value !== value);
        setItems([...newItems]);
        onChangeItems([...newItems]);
    }

    const handleNewTagKeyPress= (event: React.KeyboardEvent<HTMLInputElement>) => {

        if(event.code.toUpperCase() !== "ENTER") {
            return;
        }


        const value = event.currentTarget.value;
        const matchedItems = options.filter(
            (option: Option) => 
                option.key.toLowerCase().includes(value.toLocaleLowerCase())
        );
 
       
        if(matchedItems.length > 0) {

            if(hasItem(matchedItems[0].value)) {
                return;
            }
            setFilteredOptions([]);
            setInputSize(1);

            handleSaveNewTag({
                key: matchedItems[0].key,
                value: matchedItems[0].value
            })
        }

    }

    const handleClickOption = (event: React.MouseEvent<HTMLLIElement>, option: Option) => {
        event.stopPropagation();
        const itemsLength = items.length;
        setShowNewTag(false);
        setInputSize(1);
        setNewTagText("");
        setFilteredOptions([]);

        const inItems = items.filter((item: Option) => item.value.toUpperCase() !== option.value.toLocaleUpperCase());

        if(inItems.length === itemsLength) {
            setItems([...items, option]);
            onChangeItems([...items, option]);
            return;
        }

        setItems([...inItems]);
        onChangeItems([...inItems]);
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

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if(listBoxRef.current) {
                if(listBoxRef.current.contains(event.target as Node)) {
                   return;
                }
            }
            setShowList(false);
            setShowNewTag(false);
            setInputSize(1);
            setNewTagText("");
           
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const hasItem = (value: string):boolean => {
        const contains = items.filter((item: Option) => item.value.toLocaleLowerCase() === value.toLocaleLowerCase());
        if(contains.length === 0) {
            return false;
        }
        return true;
    }

    return (
        <ListBoxContainer
            ref={listBoxRef}
        >
            <label>{label}</label>
            <Box
                onClick={onBoxClick}
            >
                { showNewTag || items.length === 0 && 
                    placeholder && 
                    <p onClick={onBoxClick}>{placeholder}</p>}
                {items.map((item: Option) => (
                    <span 
                        key={item.value}
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
                        {/* {filteredOptions.length > 0 && 
                            <Complete>
                                {
                                    filteredOptions[0].key.toLocaleLowerCase().startsWith(
                                        newTagText.toLocaleLowerCase()
                                    ) ? filteredOptions[0].key : ""
                                }
                            </Complete>
                        } */}
                        <img src={close} onClick={handleCancelNewTag}/>
                    </span>
                }
                
            </Box>

            <DropList
                $show={showList}
            >
                <ul>
                    {filteredOptions.length === 0 && options.map((option: Option) => (
                        <li 
                            onClick={(event) => {handleClickOption(event, option)}}
                            key={option.value}
                        >
                            {option.key}
                            {hasItem(option.value) && <img src={check}/>}
                            
                        </li>
                    ))}

                    {filteredOptions.length > 0 && filteredOptions.map((option: Option) => (
                        <li 
                            onClick={(event) => {handleClickOption(event, option)}}
                            key={option.value}
                        >
                            {option.key}
                            {hasItem(option.value) && <img src={check}/>}
                            
                        </li>
                    ))}

                    {options.length === 0 && <li>Nenhuma opção encontrada</li>}
                </ul>
            </DropList>
        </ListBoxContainer>
    );
}