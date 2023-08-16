import {Button, Stack} from "@chakra-ui/react";
import {FcCollapse} from "react-icons/fc";
import ItemHead from "./ItemHead";
import AddItem from "./AddItem";
import {AiFillDelete} from "react-icons/ai";
import useItemStore, {ItemModel} from "../store/ItemStore";

interface Props {
    itemId: number
}

const Item = ({itemId}: Props) => {
    const data = useItemStore(state => state.items[itemId]) as ItemModel;
    const {addItem, updateItem, removeItem, openRecursive, closeItem, closeAll} = useItemStore(state => ({
        removeItem: state.removeItem,
        addItem: state.addItem,
        updateItem: state.updateItem,
        getItem: state.getItem,
        openRecursive: state.openRecursive,
        closeItem: state.closeItem,
        closeAll: state.closeAll
    }));

    return (
        data && <div>
            <Stack direction="row" spacing={1} align="center">
                {data.children && data.children.length > 0 &&
                <Button width={4} padding={0}
                        onClick={() => {
                            if (data.isOpened) {
                                closeItem(data.id);
                            } else {
                                openRecursive(data.id);
                            }
                        }}>
                    <FcCollapse style={{transform: `rotate(${data.isOpened ? 0 : 180}deg)`}}/>
                </Button>}

                <ItemHead name={data.name} onChange={(newName: string) => {
                    const newItem = {...data, name: newName};
                    updateItem(newItem);
                }}/>

                <AddItem onChange={(itemName: string) => {
                    const newItem = {name: itemName, id: data.id + 1, parent: data.id};
                    addItem(newItem);
                    closeAll();
                    openRecursive(data.id);
                }}/>

                <Button padding={0}
                        onClick={() => {
                            removeItem(data.id);
                        }}>
                    <AiFillDelete color={"red"}/>
                </Button>
            </Stack>
            <div style={{paddingLeft: "20px", margin: "5px", display: data.isOpened ? "block" : "none"}}>
                {data.children && data.children.length > 0 && data.children.map((child) =>
                    <Item key={child} itemId={child}/>)}
            </div>
        </div>
    )
}

export default Item;