import {
    Button,
    ButtonGroup,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {BsSearch} from "react-icons/bs";
import useItemStore, {ItemModel} from "../store/ItemStore";
import {useState} from "react";

const SearchInput = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [items, setItems] = useState<ItemModel[]>([]);

    const {getItem, searchItems, closeAll, openRecursive} = useItemStore(state => ({
        getItem: state.getItem,
        searchItems: state.searchItems,
        openRecursive: state.openRecursive,
        closeAll: state.closeAll
    }));

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setItems(searchItems(value));
    }

    const getFullName = (id: number): string => {
        const item = getItem(id);
        if (item) {
            const parent = getItem(item.parent);
            if (parent) {
                return `${getFullName(parent.id)} > ${item.name}`;
            } else {
                return item.name;
            }
        }
        return "";
    }

    return (
        <>
            <ButtonGroup>
                <Button leftIcon={<BsSearch/>} onClick={onOpen}>Search</Button>
            </ButtonGroup>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Search Item</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Input type="text" placeholder="Search" onChange={handleSearch}/>
                        {items.map((item) => <div key={item.id}>
                            <Button margin={1}
                                    onClick={() => {
                                        closeAll();
                                        openRecursive(item.id);
                                        onClose();
                                    }}>
                                {getFullName(item.id)}
                            </Button>
                        </div>)}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SearchInput;