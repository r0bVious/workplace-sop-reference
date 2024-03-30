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

const testData = [
  {
    articleHeader: "IEP Tests",
    articleContent: "IEP Tests are tests bro",
  },
  {
    articleHeader: "Lesson Plans",
    articleContent:
      "Content2Content2Content2Content2Content2Content2Content2Content2",
  },
  {
    articleHeader: "Header3",
    articleContent:
      "Content3Content3Content3Content3Content3Content3Content3Content3",
  },
  {
    articleHeader: "Header3",
    articleContent:
      "Content3Content3Content3Content3Content3Content3Content3Content3",
  },
  {
    articleHeader: "Header3",
    articleContent:
      "Content3Content3Content3Content3Content3Content3Content3Content3",
  },
  {
    articleHeader: "Header3",
    articleContent:
      "Content3Content3Content3Content3Content3Content3Content3Content3",
  },
];

const MobileNavMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = async () => {
    logoutUser();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleNavButtonClick = () => {
    onClose();
  };

  return (
    <>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader alignSelf="center">Articles</DrawerHeader>
          <DrawerBody>
            {testData.map((testData, index) => (
              <NavButton
                key={index}
                articleHeader={testData.articleHeader}
                articleContent={testData.articleContent}
                onClick={handleNavButtonClick}
              />
            ))}
          </DrawerBody>
          <Button
            colorScheme="green"
            marginBottom="1rem"
            onClick={handleClick}
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
