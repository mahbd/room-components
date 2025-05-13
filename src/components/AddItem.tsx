import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useBoolean,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useRef } from "react";

interface Props {
  onChange: (newName: string) => void;
}

const AddItem = ({ onChange }: Props) => {
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
        <Button padding={0}>
          <AiOutlinePlus />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Input
          ref={inputRef}
          placeholder={"Item name"}
          onKeyPress={(e: any) => {
            if (e.key === "Enter") {
              onChange(e.target.value);
              e.target.value = "";
              setIsEditing.off();
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default AddItem;
