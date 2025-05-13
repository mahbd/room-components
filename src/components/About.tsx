import { BsInfoSquare } from "react-icons/bs";
import {
  Button,
  Heading,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  OrderedList,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";

const About = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>
        <BsInfoSquare />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Heading as={"h1"}>Room Components</Heading>
            <Text>
              Developed by{" "}
              <Link href={"https://github.com/mahbd/"} isExternal>
                Mahmudul Alam
              </Link>
            </Text>
            <Heading as={"h2"} size={"md"}>
              About
            </Heading>
            <p>
              Room Components is a tool to help you find and organize different
              element in your room.
            </p>
            <Heading as={"h2"} size={"md"}>
              How to use
            </Heading>
            <UnorderedList>
              <ListItem>Click + icon to add new element</ListItem>
              <ListItem>Click on item to edit element</ListItem>
              <ListItem>Click delete icon to delete an element</ListItem>
              <ListItem>Click ^ icon to hide element</ListItem>
            </UnorderedList>
            <Heading as={"h2"} size={"md"}>
              Features
            </Heading>
            <OrderedList>
              <ListItem>Work both offline and online</ListItem>
              <ListItem>Dark and light mode</ListItem>
              <ListItem>Easy authentication</ListItem>
              <ListItem>Easy to use</ListItem>
              <ListItem>Sync work across device</ListItem>
              <ListItem>Search element</ListItem>
            </OrderedList>
            <Heading as={"h2"} size={"md"}>
              Technologies
            </Heading>
            <UnorderedList>
              <ListItem>React</ListItem>
              <ListItem>Chakra UI</ListItem>
              <ListItem>Zustand</ListItem>
              <ListItem>Firebase Authentication</ListItem>
              <ListItem>Firebase Realtime Database</ListItem>
            </UnorderedList>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default About;
