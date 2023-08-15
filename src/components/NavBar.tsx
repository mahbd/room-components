import {Heading, HStack} from "@chakra-ui/react";


const NavBar = () => {
    return (
        <div>
            <HStack justifyContent={'space-between'}>
                <Heading as={'h1'} size={'lg'}>Components</Heading>
            </HStack>
        </div>
    );
};

export default NavBar;