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

interface Article {
  articleHeader: string;
  articleContent: string;
}

interface MobileNavMenuProps {
  articles: Article[];
  handleNavButtonClick: (articleHeader: string, articleContent: string) => void;
  handleAdminModeChange: (mode: string) => void;
  isMobile?: boolean;
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  articles,
  handleNavButtonClick,
  handleAdminModeChange,
  isMobile,
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
            gridTemplateColumns={
              isMobile
                ? "repeat(3, 1fr)"
                : "repeat(auto-fit, minmax(200px, 1fr))"
            }
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
              width={isMobile ? "90%" : "10rem"}
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
        left="0"
        right="0"
        margin="auto"
        width={isMobile ? "100%" : "25%"}
        height="10vh"
        fontSize="3.5rem"
        borderRadius={isMobile ? "0" : "5px 5px 0px 0px"}
        boxShadow={isMobile ? "0" : "5px 5px 10px #333333"}
      >
        <Box mb={4}>︽</Box>
      </Button>
    </>
  );
};

export default MobileNavMenu;
