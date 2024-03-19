import NavButton from "../navbutton";
import {
  Box,
  Circle,
  useBreakpointValue,
  useDisclosure,
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
  const { isOpen, onToggle } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const drawerRef = useRef(null);

  const handleClickOutsideDrawer = (event: MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      if (isOpen) {
        onToggle();
      }
    }
  };

  useEffect(() => {
    if (isMobile && isOpen) {
      window.addEventListener("click", handleClickOutsideDrawer);
    }
    return () => {
      window.removeEventListener("click", handleClickOutsideDrawer);
    };
  }, [isMobile, isOpen]);

  return (
    <>
      {isMobile ? (
        <>
          <Box
            ref={drawerRef}
            position="fixed"
            bottom="0"
            left="0"
            zIndex={10}
            bg="blue.500"
            w="100%"
            h={isOpen ? "contentfit" : "5vh"}
            overflow="hidden"
            onClick={onToggle}
          >
            <motion.div
              initial={{ y: "100%" }} // off-screen
              animate={isOpen ? { y: "0%" } : { y: "100%" }}
              transition={{ duration: 0.3 }}
            >
              {testData.map((dataItem, index) => (
                <NavButton
                  key={index}
                  article_header={dataItem.article_header}
                />
              ))}
            </motion.div>
          </Box>
        </>
      ) : (
        <p>hi</p>
      )}
    </>
  );
};

export default NavMenu;
