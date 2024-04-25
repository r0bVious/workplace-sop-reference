import {
  Box,
  Button,
  FormControl,
  Input,
  Stack,
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

const CommentForm = ({ comments: initialComments, articleHeader }) => {
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

  return (
    <>
      {comments.map((comment) => (
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          key={comment._id}
        >
          <Box bgColor={"lightgray"} m="0.5rem">
            <Box fontWeight="650">{comment.username}</Box>
            <Box ml="1rem">{comment.commentContent}</Box>
          </Box>
          {isAdmin ? (
            <Button
              colorScheme={"red"}
              onClick={() => handleClick(comment._id)}
            >
              Delete
            </Button>
          ) : null}
        </Stack>
      ))}
      <FormControl>
        <Input
          type="text"
          value={commentContent}
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit}>Submit Comment</Button>
      </FormControl>

      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={null}
        onClose={closeDeleteAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
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
          <AlertDialogContent>
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
    </>
  );
};

export default CommentForm;
