import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@chakra-ui/react";

const Article = ({
  article_header = "Header Text",
  article_content = "Content Text",
}) => {
  return (
    <Card>
      <CardHeader>{article_header}</CardHeader>
      <CardBody>{article_content}</CardBody>
      <CardFooter display="flex" flexDirection="column">
        <p>Display Comments Here</p>
        <Button>Add Comment</Button>
      </CardFooter>
    </Card>
  );
};

export default Article;
