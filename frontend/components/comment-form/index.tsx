import {
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import {
  deleteComment,
  getComments,
  newComment,
} from "../../helpers/api-communicator.ts";
import useCustomToast from "../custom-hooks/customToast.ts";

const CommentForm = ({
  comments: initialComments,
  articleHeader,
  isMobile,
}) => {
  const username = useAuth()?.user?.username;
  const isAdmin = useAuth()?.isAdmin;
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState(initialComments);
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
  const [commentToDeleteId, setCommentToDeleteId] = useState(null);
  const toast = useCustomToast();

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const refreshComments = async (articleHeader: string) => {
    try {
      const data = await getComments({ articleHeader });
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => setCommentContent(e.target.value);

  const handleSubmit = async () => {
    if (commentContent.trim() === "") {
      toast({
        title: "Please enter a comment.",
        status: "error",
      });
      return;
    }
    openSubmitAlert();
  };

  const handleConfirmSubmit = async () => {
    closeSubmitAlert();
    const dateCreated = new Date();
    try {
      await newComment(username, articleHeader, commentContent, dateCreated);
      setCommentContent("");
      const newCommentList = await refreshComments(articleHeader);
      setComments(newCommentList);
      toast({ title: "Comment posted!", status: "success" });
    } catch (error) {
      console.log(error);
      toast({ title: "Comment posting failed!", status: "error" });
    }
  };

  const handleCancelSubmit = () => {
    closeSubmitAlert();
  };

  const handleClick = async (commentId) => {
    setCommentToDeleteId(commentId);
    openDeleteAlert();
  };

  const handleConfirmDelete = async () => {
    closeDeleteAlert();
    try {
      await deleteComment(commentToDeleteId);
      toast({ title: "Comment removed.", status: "info" });
      const newCommentList = await refreshComments(articleHeader);
      setComments(newCommentList);
    } catch (error) {
      console.log(error);
      toast({ title: "Comment removal failed!", status: "error" });
    }
  };

  const handleCancelDelete = () => {
    closeDeleteAlert();
    setCommentToDeleteId(null);
  };

  const formatDate = (dateString: String): string => {
    const date = new Date(dateString.toString());
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day} @ ${hours}:${minutes}`;
  };

  return (
    <Stack
      spacing={4}
      mb={isMobile ? "5rem" : 0}
      sx={{ p: { textIndent: "0", marginInlineStart: "0" } }}
    >
      {comments.map((comment) => (
        <Box
          key={comment._id}
          bg="gray.200"
          borderRadius="md"
          boxShadow="md"
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
          p={5}
        >
          <Box display={"flex"} justifyContent={"space-between"} width="100%">
            <Text fontWeight="bold">{comment.username}</Text>
            <Text as="i">{formatDate(comment.dateCreated)}</Text>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width="100%"
          >
            <Text maxWidth="75%">{comment.commentContent}</Text>
            {isAdmin && (
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => handleClick(comment._id)}
              >
                Delete
              </Button>
            )}
          </Box>
        </Box>
      ))}
      <FormControl display={"flex"} flexDirection={"column"} gap={2}>
        <Input
          type="text"
          value={commentContent}
          onChange={handleInputChange}
          placeholder="Write a comment..."
        />
        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          alignSelf={"flex-end"}
        >
          Post Comment
        </Button>
      </FormControl>

      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={null}
        onClose={closeDeleteAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent maxW="sm">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Comment
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this comment?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleCancelDelete}>Cancel</Button>
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
          <AlertDialogContent maxW="sm">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Post Comment
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to post this comment?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleCancelSubmit}>Cancel</Button>
              <Button colorScheme="green" onClick={handleConfirmSubmit} ml={3}>
                Post
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Stack>
  );
};

export default CommentForm;
