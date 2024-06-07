import { Button, Text } from "@chakra-ui/react";

interface NavButtonProps {
  articleHeader: string;
  articleContent: string;
  onClick: (articleHeader: string, articleContent: string) => void;
  onCloseDrawer: () => void;
}

const NavButton = ({
  articleHeader,
  articleContent,
  onClick,
  onCloseDrawer,
}: NavButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(articleHeader, articleContent);
    }
    if (onCloseDrawer) {
      onCloseDrawer();
    }
  };

  return (
    <Button onClick={handleClick} h="100px" w="auto">
      <Text whiteSpace="pre-wrap" overflowWrap="break-word">
        {articleHeader}
      </Text>
    </Button>
  );
};

export default NavButton;
