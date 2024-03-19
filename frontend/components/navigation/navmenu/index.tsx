import NavButton from "../navbutton";
import {
  Box,
  useBreakpointValue,
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

const testData = [
  {
    article_header: "Header1",
    article_content:
      "Content1Content1Content1Content1Content1Content1Content1Content1",
  },
  {
    article_header: "Header2",
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

const NavMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {isMobile ? (
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
      ) : (
        <p>hi, non-mobile setup here plz</p>
      )}
    </>
  );
};

export default NavMenu;
