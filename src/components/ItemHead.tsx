import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useBoolean,
} from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  name: string;
  onChange: (newName: string) => void;
}

function ItemHead({ name, onChange }: Props) {
  const [isEditing, setIsEditing] = useBoolean();
  const inputRef = useRef(null);

  return (
    <Popover
      initialFocusRef={inputRef}
      isOpen={isEditing}
      onOpen={setIsEditing.on}
      onClose={setIsEditing.off}
    >
      <PopoverTrigger>
        <Button>{name}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Input
          ref={inputRef}
          defaultValue={name}
          onKeyPress={(e: any) => {
            if (e.key === "Enter") {
              onChange(e.target.value);
              setIsEditing.off();
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default ItemHead;
