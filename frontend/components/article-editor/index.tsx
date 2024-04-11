import {
  FormControl,
  FormLabel,
  Input,
  Button,
  CloseButton,
  FormHelperText,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";
import { newArticle } from "../../helpers/api-communicator.ts";

const ArticleEditor = ({ handleAdminModeChange }) => {
  const [articleContent, setArticleContent] = useState<string>("");
  const [articleHeader, setArticleHeader] = useState<string>("");

  //maybe a useEffect could populate these fields for editing, given a state?

  const handleArticleChange = (articleContent: string) => {
    setArticleContent(articleContent);
  };

  const handleHeaderChange = (e) => setArticleHeader(e.target.value);

  const handleSubmit = async () => {
    try {
      toast.loading("Saving new article...", { id: "article" });
      await newArticle(articleHeader, articleContent);
      toast.success("New article saved!", { id: "article" });
    } catch (error) {
      toast.error("Error: Data not saved to database.", { id: "article" });
    }
  };

  return (
    <FormControl p={5} height="100vh" display="flex" flexDirection="column">
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
        <Button onClick={handleSubmit} width="100%">
          Save Article
        </Button>
      </div>
    </FormControl>
  );
};

export default ArticleEditor;
