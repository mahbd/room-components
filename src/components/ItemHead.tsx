import {Button, Input, Popover, PopoverContent, PopoverTrigger, useBoolean} from "@chakra-ui/react";

function ItemHead(props: { name: string, onChange: (e: any) => void }) {
    const [isEditing, setIsEditing] = useBoolean();
    return <Popover
        isOpen={isEditing}
        onOpen={setIsEditing.on}
        onClose={setIsEditing.off}>
        <PopoverTrigger>
            <Button>{props.name}</Button>
        </PopoverTrigger>
        <PopoverContent>
            <Input defaultValue={props.name}
                   onKeyPress={(e: any) => {
                       if (e.key === "Enter") {
                           props.onChange(e.target.value);
                            setIsEditing.off();
                       }
                   }}
            />
        </PopoverContent>
    </Popover>;
}

export default ItemHead;