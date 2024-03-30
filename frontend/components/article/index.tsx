import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@chakra-ui/react";

const Article = ({
  articleHeader = "Header Text",
  articleContent = "Content Text",
}) => {
  return (
    <Card>
      <CardHeader>{articleHeader}</CardHeader>
      <CardBody>{articleContent}</CardBody>
      <CardFooter display="flex" flexDirection="column">
        <p>Display Comments Here</p>
        <Button>Add Comment</Button>
      </CardFooter>
    </Card>
  );
};

export default Article;
