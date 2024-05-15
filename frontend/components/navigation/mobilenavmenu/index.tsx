import { useAuth } from "../../../context/AuthContext.tsx";
import { logoutUser } from "../../../helpers/api-communicator.ts";
import NavButton from "../navbutton";
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Box,
} from "@chakra-ui/react";
import AdminModal from "../../admin-modal";

const MobileNavMenu = ({
  articles,
  handleNavButtonClick,
  handleAdminModeChange,
}) => {
  const isAdmin = useAuth()?.isAdmin;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogOutClick = async () => {
    logoutUser();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleCloseDrawer = () => {
    onClose();
  };

  return (
    <>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <Box bg="#3182ce" height={"3px"}></Box>
          <DrawerBody
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            gap="1rem"
            my={5}
          >
            {articles.map((article, index) => (
              <NavButton
                key={index}
                articleHeader={article.articleHeader}
                articleContent={article.articleContent}
                onClick={handleNavButtonClick}
                onCloseDrawer={handleCloseDrawer}
              />
            ))}
          </DrawerBody>
          <Box display="flex" justifyContent={"center"} paddingX={5}>
            <Button
              colorScheme="red"
              marginBottom="1rem"
              onClick={handleLogOutClick}
              width="90%"
              height="7vh"
              fontSize="1.5rem"
            >
              Logout
            </Button>
            {isAdmin ? (
              <AdminModal handleAdminModeChange={handleAdminModeChange} />
            ) : null}
          </Box>
        </DrawerContent>
      </Drawer>
      <Button
        colorScheme="blue"
        onClick={onOpen}
        position="fixed"
        bottom="0"
        width="100%"
        height="10vh"
        fontSize="3.5rem"
        borderRadius="0"
      >
        <Box mb={4}>︽</Box>
      </Button>
    </>
  );
};

export default MobileNavMenu;
