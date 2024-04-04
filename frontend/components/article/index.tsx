import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import CommentForm from "../comment-form";

const Article = ({
  articleHeader = "Header Text",
  articleContent = "Content Text",
  comments,
}) => {
  //Because your data is coming in formatted by HTML, manually style it here
  const articleStyles = { h3: { fontWeight: "bold", fontSize: "1.5rem" } };
  const articleComments = comments.filter(
    (comment) => comment.articleHeader === articleHeader
  );
  return (
    <Card sx={articleStyles}>
      <CardHeader fontWeight="bold" fontSize="1.8rem">
        {articleHeader}
      </CardHeader>
      <CardBody dangerouslySetInnerHTML={{ __html: articleContent }} />
      <CardFooter display="flex" flexDirection="column">
        <CommentForm comments={articleComments} articleHeader={articleHeader} />
      </CardFooter>
    </Card>
  );
};

export default Article;
