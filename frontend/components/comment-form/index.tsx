import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { deleteComment, newComment } from "../../helpers/api-communicator.ts";
import { toast } from "react-hot-toast";

const CommentForm = ({ comments: initialComments, articleHeader }) => {
  const username = useAuth()?.user?.username;
  const isAdmin = useAuth()?.isAdmin;
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleInputChange = (e) => setCommentContent(e.target.value);

  const handleSubmit = async () => {
    const dateCreated = new Date();
    console.log(username, articleHeader, commentContent, dateCreated);
    try {
      const newCommentData = {
        username,
        commentContent,
        dateCreated,
      };
      await newComment(username, articleHeader, commentContent, dateCreated);
      setComments([...comments, newCommentData]);
      setCommentContent("");
      toast.success("Comment posted!", { id: "comment" });
    } catch (error) {
      console.log(error);
      toast.error("Comment posting failed.", { id: "comment" });
    }
  };

  const handleClick = async (commentId) => {
    try {
      await deleteComment(commentId);
      toast.success("Comment deleted!", { id: "comment" });
      const newCommentList = comments.filter(
        (comment) => comment._id !== commentId
      );
      setComments(newCommentList);
    } catch (error) {
      console.log(error);
      toast.error("Comment deletion failed.", { id: "comment" });
    }
  };

  return (
    <>
      {comments.map((comment, index) => (
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box key={index} bgColor={"lightgray"} m="0.5rem">
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
    </>
  );
};

export default CommentForm;
