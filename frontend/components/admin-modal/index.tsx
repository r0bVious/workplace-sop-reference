import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

const AdminModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        height="5vh"
        ml={5}
        fontSize="1.5rem"
      >
        Admin
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent height="75dvh" width="95dvw">
          <ModalHeader>Admin Menu</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            justifyContent={"space-evenly"}
          >
            <Button colorScheme="blue" variant="solid" size="lg" height="20%">
              Add/Remove Employees
            </Button>
            <Button colorScheme="blue" variant="solid" size="lg" height="20%">
              Add/Remove Articles
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminModal;
