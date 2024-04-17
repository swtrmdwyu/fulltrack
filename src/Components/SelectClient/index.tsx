import { useState } from "react";
import Select from "../Select";
import Client from "../../interfaces/Client";
import Option from "../../interfaces/Option";

interface SelectClientProps {
    clients: Client[] | [],
    onSetClient: (client: Client) => void
}

export default function SelectClient({ clients, onSetClient }: SelectClientProps) {
    const [value, setValue] =  useState("");
    const options = formatedOptions(clients);

	function formatedOptions(clients: Client[]): Option[] {
		const options = clients.map((option: Client) => {
			return {
				key: option.client_description,
				value: option.client_id.toString()
			}
		});

		if(options.length === 0) {
			return [{
				key: "Nenhum cliente encontrado.",
				value: ""
			}];
		}

		return options;
	}

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValue(value);

    }

    const filterOptions = (): Option[] => {
        const newOptions = options.filter(
            (option: Option) => 
                option.key.toLowerCase().includes(value.toLocaleLowerCase())
        );

        if(newOptions.length > 0) {
            return newOptions;
        }
        if(value === "") {
            return options;
        }

        return [{ key: "Nenhum cliente encontrado.", value: "" }];
    }

    const onSet = (value: string) => {
        const client: Client[] = clients.filter((client: Client) => client.client_id.toString() === value);

        if(client.length === 0) {
            return;
        }
        if(onSetClient) onSetClient(client[0]);
        setValue(client[0].client_description);
    }

    return (
        <Select 
            options={filterOptions().sort((a, b) => a.key.localeCompare(b.key))}   
            onSetValue={onSet}
            value={value}
            onChange={onChange}
            label="Cliente"
        />
    )
}