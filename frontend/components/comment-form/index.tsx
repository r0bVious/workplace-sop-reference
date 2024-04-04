import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";

const CommentForm = ({ comments, articleHeader }) => {
  const user = useAuth()?.user;
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);
  const handleSubmit = () => {
    //submit comment - username, commentContent, dateCreated, articleHeader(?)
    //article_id seems the smartest, but just who cares given the scope, right?
    const newComment = [user, articleHeader, input, dateCreated];
    try {
      const response = axios.post("/newcomment"); //wat url?
      //...
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {comments.map((comment, index) => (
        <Box key={index} bgColor={"lightgray"} m="0.5rem">
          <Box fontWeight="650">{comment.username}</Box>
          <Box ml="1rem">{comment.commentContent}</Box>
        </Box>
      ))}
      <FormControl>
        <Input type="text" value={input} onChange={handleInputChange} />
        <Button onClick={handleSubmit}>Submit Comment</Button>
      </FormControl>
    </>
  );
};

export default CommentForm;
