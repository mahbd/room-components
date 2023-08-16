import {Heading, HStack} from "@chakra-ui/react";
import SearchInput from "./SearchInput";


const NavBar = () => {
    return (
        <div>
            <HStack justifyContent={'space-between'}>
                <Heading as={'h1'} size={'lg'}>Components</Heading>
                <SearchInput/>
            </HStack>
        </div>
    );
};

export default NavBar;