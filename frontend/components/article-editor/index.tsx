import {
  FormControl,
  FormLabel,
  Input,
  Button,
  CloseButton,
  FormHelperText,
  Text,
  Box,
  Card,
  CardBody,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";
import {
  newArticle,
  deleteArticle,
  getArticle,
  editArticle,
} from "../../helpers/api-communicator.ts";

const ArticleEditor = ({
  handleAdminModeChange,
  handleArticleListChanged,
  articles,
}) => {
  const [articleContent, setArticleContent] = useState<string>("");
  const [articleHeader, setArticleHeader] = useState<string>("");
  const [articleId, setArticleId] = useState<string>("");
  const [articleList, setArticleList] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setArticleList(articles);
  }, [articles]);

  useEffect(() => {
    setEditMode(false);
  }, []);

  const handleArticleChange = (articleContent: string) => {
    setArticleContent(articleContent);
  };

  const handleHeaderChange = (e) => setArticleHeader(e.target.value);

  const handleSubmit = async () => {
    if (editMode) {
      try {
        toast.loading("Saving edited article...", { id: "article" });
        await editArticle(articleId, articleHeader, articleContent);
        toast.success("Edited article saved!", { id: "article" });
        handleAdminModeChange(null);
        handleArticleListChanged();
      } catch (error) {
        toast.error("Error: Data not saved to database.", { id: "article" });
      }
      setEditMode(false);
    } else {
      try {
        toast.loading("Saving new article...", { id: "article" });
        await newArticle(articleHeader, articleContent);
        toast.success("New article saved!", { id: "article" });
        handleAdminModeChange(null);
        handleArticleListChanged();
      } catch (error) {
        toast.error("Error: Data not saved to database.", { id: "article" });
      }
    }
  };

  const handleDeleteClick = async (articleId: string) => {
    try {
      toast.loading("Deleting article from database...", { id: "article" });
      await deleteArticle(articleId);
      toast.success("Article deleted!", { id: "article" });
      const newArticleList = articleList.filter(
        (article) => article._id !== articleId
      );
      setArticleList(newArticleList);
      handleArticleListChanged();
    } catch (error) {
      console.log(error);
      toast.error("Error: Article unable to be removed from database.", {
        id: "article",
      });
    }
  };

  const handleEditClick = async (articleId: String) => {
    try {
      setEditMode(true);
      const { existingArticle } = await getArticle(articleId);
      setArticleHeader(existingArticle.articleHeader);
      setArticleContent(existingArticle.articleContent);
      setArticleId(existingArticle._id);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormControl p={5} height="80vh" display="flex" flexDirection="column">
        <CloseButton
          size="lg"
          alignSelf="flex-end"
          onClick={() => handleAdminModeChange(null)}
        />
        <Text fontWeight="bold" textDecoration="underline">
          Article Editor
        </Text>
        <FormHelperText marginBottom={5}>
          This is where you can add new articles or edit existing articles.
        </FormHelperText>
        <FormLabel>Article Header</FormLabel>
        <Input
          type="text"
          value={articleHeader}
          onChange={handleHeaderChange}
          marginBottom={5}
        />
        <FormLabel>Article Body</FormLabel>
        <div style={{ flex: 1, minHeight: 0, marginBottom: "1rem" }}>
          <ReactQuill
            style={{ height: "85%" }}
            theme="snow"
            value={articleContent}
            onChange={handleArticleChange}
          />
        </div>
        <div>
          <Button onClick={handleSubmit} width="100%" marginTop={5}>
            Save Article
          </Button>
        </div>
      </FormControl>
      <Box>
        {articleList.map((article) => {
          return (
            <Card key={article._id}>
              <CardBody display="flex" justifyContent="space-between">
                <Stack>
                  <Text fontWeight="bold">{article.articleHeader}</Text>
                </Stack>
                <Button
                  colorScheme={"blue"}
                  onClick={() => handleEditClick(article._id)}
                >
                  Edit
                </Button>
                <Button
                  colorScheme={"red"}
                  onClick={() => handleDeleteClick(article._id)}
                >
                  Delete
                </Button>
              </CardBody>
            </Card>
          );
        })}
      </Box>
    </>
  );
};

export default ArticleEditor;
