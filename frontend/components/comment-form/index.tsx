import { Box, Text } from "@chakra-ui/react";

const CommentForm = ({ comments }) => {
  return (
    <>
      {comments.map((comment, index) => (
        <Box key={index}>{comment.comment_content}</Box>
      ))}
    </>
  );
};

export default CommentForm;
