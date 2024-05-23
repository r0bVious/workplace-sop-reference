import {
  FormControl,
  FormLabel,
  Input,
  Button,
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
import { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  newArticle,
  deleteArticle,
  getArticle,
  editArticle,
} from "../../helpers/api-communicator.ts";
import useCustomToast from "../custom-hooks/customToast.ts";
import "./index.css";

interface Article {
  _id: string;
  articleHeader: string;
  articleContent: string;
}

interface ArticleEditorProps {
  handleAdminModeChange: (AdminMode: string) => void;
  handleArticleListChanged: () => void;
  articles: Article[];
  isMobile?: boolean;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({
  handleAdminModeChange,
  handleArticleListChanged,
  articles,
}) => {
  const [articleContent, setArticleContent] = useState<string>("");
  const [articleHeader, setArticleHeader] = useState<string>("");
  const [articleId, setArticleId] = useState<string>("");
  const [articleList, setArticleList] = useState<Article[]>([]);
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

  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setArticleHeader(e.target.value);

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
        handleAdminModeChange("");
        handleArticleListChanged();
      } catch (error) {
        toast({ title: "Cannot save changes to article!", status: "error" });
      }
      setEditMode(false);
    } else {
      try {
        await newArticle(articleHeader, articleContent);
        toast({ title: "New article saved!", status: "success" });
        handleAdminModeChange("");
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

  const leastDestructiveRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <FormControl px={5} display="flex" flexDirection="column" gap={2}>
        <Button
          colorScheme="red"
          size="lg"
          alignSelf="flex-start"
          onClick={() => handleAdminModeChange("")}
          marginTop={2}
        >
          Go Back
        </Button>
        <Text
          fontWeight="bold"
          textDecoration="underline"
          fontSize="xl"
          textAlign={"center"}
        >
          Create/Edit Article
        </Text>
        <Stack bgColor="gray.200" borderRadius={"md"} boxShadow={"md"} p={5}>
          <div>
            <FormLabel>Article Header</FormLabel>
            <Input
              type="text"
              value={articleHeader}
              onChange={handleHeaderChange}
              bg={"white"}
              placeholder="i.e. Weekly Meeting Notes"
            />
          </div>
          <div>
            <FormLabel>Article Body</FormLabel>
            <ReactQuill
              theme="snow"
              value={articleContent}
              onChange={handleArticleChange}
              modules={{
                toolbar: [
                  ["image", "link"],
                  [{ size: ["small", false, "large", "huge"] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["clean"],
                ],
              }}
              style={{
                background: "white",
                height: "auto",
              }}
              placeholder="Type something..."
            />
          </div>
          <Button
            onClick={handleSubmitClick}
            width="100%"
            colorScheme={"blue"}
            maxWidth="25rem"
            alignSelf={"center"}
          >
            Save/Update Article
          </Button>
        </Stack>
      </FormControl>
      <Text
        margin={"2rem 0 0.5rem"}
        fontWeight="bold"
        textDecoration="underline"
        fontSize="xl"
        textAlign="center"
      >
        Edit/Delete Existing Articles
      </Text>
      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          md: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
        gridGap={5}
        justifyContent="center"
        mx={5}
        paddingBottom={5}
      >
        {articleList.map((article, index) => {
          return (
            <Card
              key={article._id}
              bgColor={"gray.200"}
              borderRadius={"md"}
              boxShadow={"md"}
              width="100%"
            >
              <CardBody display={"flex"} flexDirection={"column"} gap={5}>
                <Stack>
                  <Text fontWeight="bold" textAlign={"center"}>
                    {article.articleHeader}
                  </Text>
                </Stack>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Button
                    colorScheme={"blue"}
                    onClick={() => handleEditClick(article._id)}
                    boxShadow={"md"}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme={"red"}
                    onClick={() => handleDeleteClick(article._id)}
                    boxShadow={"md"}
                  >
                    Delete
                  </Button>
                </Box>
              </CardBody>
            </Card>
          );
        })}
      </Box>

      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={
          leastDestructiveRef as React.MutableRefObject<HTMLElement | null>
        }
        onClose={closeDeleteAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent maxW="sm">
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
        leastDestructiveRef={
          leastDestructiveRef as React.MutableRefObject<HTMLElement | null>
        }
        onClose={closeSubmitAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent maxW="sm">
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
