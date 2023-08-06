import {useState} from "react";
import {Button, Stack} from "@chakra-ui/react";
import {FcCollapse} from "react-icons/fc";
import ItemHead from "./ItemHead";
import {ItemModel} from "../models";
import AddItem from "./AddItem";

const Item = ({data, onChange, index}: { data: ItemModel, onChange, index? }) => {
    const [isOpen, setIsOpen] = useState(true);

    const changeHere = (newData: ItemModel, index: number | undefined) => {
        data.children[index] = newData;
        if (index === undefined) {
            onChange(data, index);
        } else {
            onChange(data);
        }
    }

    return (
        <div>
            <Stack direction="row" spacing={1} align="center">
                {data.children.length > 0 && <Button width={4} padding={0}
                  onClick={() => setIsOpen(!isOpen)}>
                  <FcCollapse style={{transform: `rotate(${isOpen ? 0 : 180}deg)`}}/>
                </Button>}

                <ItemHead name={data.name} onChange={(newName: string) => {
                    onChange({...data, name: newName}, index);
                }}/>

                <AddItem onChange={(itemName: string) => {
                    data.children.push({name: itemName, children: []});
                    onChange(data, index);
                }} />
            </Stack>
            {isOpen && <div style={{paddingLeft: "20px", margin: "5px"}}>
                {data.children.length > 0 && data.children.map((child, index) =>
                    <Item key={index} data={child} index={index} onChange={changeHere}/>)}
            </div>
            }
        </div>
    )
}

export default Item;