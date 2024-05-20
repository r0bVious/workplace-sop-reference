import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import CommentForm from "../comment-form";

const Article = ({
  articleHeader = "Header Text",
  articleContent = "Content Text",
  comments,
  isMobile,
}) => {
  const desktopModeStyles = {
    background: "#333A3F",
    padding: "1rem 0 5rem",
  };

  const mobileStyles = {
    h3: { fontWeight: "bold", fontSize: "1.75rem" },
    h2: { fontWeight: "bold", fontSize: "1.75rem" },
    p: { textIndent: "2rem", marginX: "0.5rem", marginBottom: "1rem" },
    ol: { marginLeft: "2rem" },
    ul: { marginLeft: "2rem" },
  };

  const desktopStyles = {
    ...mobileStyles,
    maxWidth: "75%",
    margin: "0 auto",
    boxShadow: "5px 5px 10px black",
  };

  const cardStyles = isMobile ? mobileStyles : desktopStyles;

  const articleComments = comments.filter(
    (comment) => comment.articleHeader === articleHeader
  );
  return (
    <div style={!isMobile ? desktopModeStyles : {}}>
      <Card sx={cardStyles}>
        <CardHeader
          fontWeight="bold"
          fontSize="1.75rem"
          color="white"
          bgColor="#3182ce"
          textShadow="2px 2px 3px black"
        >
          {articleHeader}
        </CardHeader>
        <CardBody dangerouslySetInnerHTML={{ __html: articleContent }} />
        <CardFooter display="flex" flexDirection="column">
          <CommentForm
            comments={articleComments}
            articleHeader={articleHeader}
            isMobile={isMobile}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Article;
