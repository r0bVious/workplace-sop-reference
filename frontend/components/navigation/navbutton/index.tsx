import { Button } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

interface NavButtonProps {
  articleLink?: string;
  articleHeader?: string;
  articleContent?: string;
  onClick?: (header: string, content: string) => void;
}

const NavButton = ({
  articleLink = "/test-link",
  articleHeader = "test-header",
  articleContent = "test-content",
  onClick,
}: NavButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(articleHeader, articleContent);
    }
  };
  return (
    <ReactRouterLink to={articleLink} onClick={handleClick}>
      <Button mx="1rem" my="0.5rem">
        {articleHeader}
      </Button>
    </ReactRouterLink>
  );
};

export default NavButton;
