import {Button, Input, Popover, PopoverContent, PopoverTrigger} from "@chakra-ui/react";

function ItemHead(props: { open: boolean, isEditing: { on: () => void; off: () => void; toggle: () => void }, name: string, onKeyPress: (e: any) => void }) {
    return <Popover
        isOpen={props.open}
        onOpen={props.isEditing.on}
        onClose={props.isEditing.off}>
        <PopoverTrigger>
            <Button>{props.name}</Button>
        </PopoverTrigger>
        <PopoverContent>
            <Input defaultValue={props.name}
                   onKeyPress={props.onKeyPress}
            />
        </PopoverContent>
    </Popover>;
}

export default ItemHead;