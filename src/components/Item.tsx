import {useState} from "react";
import {Button, Stack, useBoolean} from "@chakra-ui/react";
import {FcCollapse} from "react-icons/fc";
import ItemHead from "./ItemHead";
import {AiOutlinePlus} from "react-icons/ai";
import {ItemModel} from "../models";

const Item = ({data, onChange, index}: { data: ItemModel, onChange, index? }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isEditing, setIsEditing] = useBoolean();

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
                {data.children.length > 0 && <Button
                  marginLeft={0} onClick={() => setIsOpen(!isOpen)}>
                  <FcCollapse style={{transform: `rotate(${isOpen ? 0 : 180}deg)`}}/>
                </Button>}

                <ItemHead open={isEditing} isEditing={setIsEditing} name={data.name} onKeyPress={(e: any) => {
                    if (e.key === "Enter") {
                        onChange({...data, name: e.target.value}, index);
                        setIsEditing.off();
                    }
                }}/>
                <Button marginLeft={0}><AiOutlinePlus/></Button>
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