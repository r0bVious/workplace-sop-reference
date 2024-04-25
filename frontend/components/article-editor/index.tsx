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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  newArticle,
  deleteArticle,
  getArticle,
  editArticle,
} from "../../helpers/api-communicator.ts";
import useCustomToast from "../custom-hooks/customToast.ts";

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
  const toast = useCustomToast();

  const {
    isOpen: isDeleteAlertOpen,
    onOpen: openDeleteAlert,
    onClose: closeDeleteAlert,
  } = useDisclosure();
  const {
    isOpen: isSubmitAlertOpen,
    onOpen: openSubmitAlert,
    onClose: closeSubmitAlert,
  } = useDisclosure();

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

  const handleSubmitClick = async () => {
    try {
      openSubmitAlert();
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmSubmit = async () => {
    if (editMode) {
      try {
        await editArticle(articleId, articleHeader, articleContent);
        toast({ title: "Article changes saved!", status: "success" });
        handleAdminModeChange(null);
        handleArticleListChanged();
      } catch (error) {
        toast({ title: "Cannot save changes to article!", status: "error" });
      }
      setEditMode(false);
    } else {
      try {
        await newArticle(articleHeader, articleContent);
        toast({ title: "New article saved!", status: "success" });
        handleAdminModeChange(null);
        handleArticleListChanged();
      } catch (error) {
        toast({ title: "Cannot save new article!", status: "error" });
      }
    }
  };

  const handleDeleteClick = async (articleId: string) => {
    try {
      setArticleId(articleId);
      openDeleteAlert();
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      closeDeleteAlert();
      await deleteArticle(articleId);
      toast({
        title: "Article deleted.",
        status: "info",
      });
      const newArticleList = articleList.filter(
        (article) => article._id !== articleId
      );
      setArticleList(newArticleList);
      handleArticleListChanged();
    } catch (error) {
      console.log(error);
      toast({
        title: "Unable to delete article.",
        status: "error",
      });
    }
  };

  const handleCancel = () => {
    closeDeleteAlert();
    closeSubmitAlert();
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
          <Button onClick={handleSubmitClick} width="100%" marginTop={5}>
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

      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={null}
        onClose={closeDeleteAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Article
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this article?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isSubmitAlertOpen}
        leastDestructiveRef={null}
        onClose={closeSubmitAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Save/Edit Article
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to save/edit this article?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button colorScheme="green" onClick={handleConfirmSubmit} ml={3}>
                Save
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ArticleEditor;
