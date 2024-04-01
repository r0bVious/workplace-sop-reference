import { logoutUser } from "../../../helpers/api-communicator.ts";
import NavButton from "../navbutton";
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";

const MobileNavMenu = ({ articles, handleNavButtonClick }) => {
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
          <DrawerHeader alignSelf="center">Articles</DrawerHeader>
          <DrawerBody
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            gap="1rem"
          >
            {articles.map((article, index) => (
              <NavButton
                key={index}
                articleHeader={article.article_header}
                articleContent={article.article_content}
                onClick={handleNavButtonClick}
                onCloseDrawer={handleCloseDrawer}
              />
            ))}
          </DrawerBody>
          <Button
            colorScheme="green"
            marginBottom="1rem"
            onClick={handleLogOutClick}
            width="90%"
            alignSelf="center"
            height="5vh"
            fontSize="1.5rem"
          >
            Logout
          </Button>
        </DrawerContent>
      </Drawer>
      <Button
        colorScheme="blue"
        onClick={onOpen}
        position="fixed"
        bottom="0"
        width="100%"
        height="8vh"
        fontSize="1.5rem"
      >
        &#9776;
      </Button>
    </>
  );
};

export default MobileNavMenu;
