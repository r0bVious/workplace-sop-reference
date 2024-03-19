import { Button } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const NavButton = ({
  article_link = "/test-link",
  article_header = "test-content",
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <ReactRouterLink to={article_link} onClick={handleClick}>
      <Button mx="1rem" my="0.5rem">
        {article_header}
      </Button>
    </ReactRouterLink>
  );
};

//this will be mapped over with existing sop data, maybe using the "article_header"

export default NavButton;
