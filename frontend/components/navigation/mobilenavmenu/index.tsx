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
    article_header: "IEP Tests",
    article_content: "IEP Tests are tests bro",
  },
  {
    article_header: "Lesson Plans",
    article_content:
      "Content2Content2Content2Content2Content2Content2Content2Content2",
  },
  {
    article_header: "Header3",
    article_content:
      "Content3Content3Content3Content3Content3Content3Content3Content3",
  },
  {
    article_header: "Header3",
    article_content:
      "Content3Content3Content3Content3Content3Content3Content3Content3",
  },
  {
    article_header: "Header3",
    article_content:
      "Content3Content3Content3Content3Content3Content3Content3Content3",
  },
  {
    article_header: "Header3",
    article_content:
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

  return (
    <>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader alignSelf="center">Articles</DrawerHeader>
          <DrawerBody>
            {testData.map((dataItem, index) => (
              <NavButton
                key={index}
                article_header={dataItem.article_header}
                onClick={onClose}
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
