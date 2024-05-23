import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

interface AdminModalProps {
  handleAdminModeChange: (mode: string) => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ handleAdminModeChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        height="7vh"
        ml={5}
        fontSize="1.5rem"
        width="10rem"
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
            <Button
              colorScheme="blue"
              variant="solid"
              size="lg"
              height="20%"
              onClick={() => handleAdminModeChange("articles")}
            >
              Add/Edit/Remove Articles
            </Button>
            <Button
              colorScheme="blue"
              variant="solid"
              size="lg"
              height="20%"
              onClick={() => handleAdminModeChange("users")}
            >
              Add/Remove Users
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminModal;
