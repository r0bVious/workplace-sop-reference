import { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  VStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import useCustomToast from "../custom-hooks/customToast";

const Login = () => {
  const auth = useAuth();
  const [username, setUsername] = useState("Visitor");
  const [password, setPassword] = useState("ilikerob");
  const [loading, setLoading] = useState(false);
  const toast = useCustomToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await auth?.login(username, password);
      toast({
        title: "Login Successful!",
        status: "success",
      });
    } catch (error) {
      console.log("Error:", error);
      toast({
        title: "Login Failed!",
        status: "error",
      });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack padding={10} spacing={6} minWidth={"30dvw"}>
        <FormControl>
          <Input
            id="username"
            value={username}
            type="text"
            placeholder="Enter username..."
            onChange={(e) => setUsername(e.target.value)}
            size="lg"
            variant="flushed"
          />
        </FormControl>
        <FormControl>
          <Input
            id="password"
            value={password}
            type="password"
            placeholder="Enter password..."
            onChange={(e) => setPassword(e.target.value)}
            size="lg"
            variant="flushed"
          />
        </FormControl>
        {loading ? (
          <Spinner color="blue.500" />
        ) : (
          <Button colorScheme="blue" type="submit" size="lg">
            Log In
          </Button>
        )}
        <Text fontSize="small" fontStyle="italic">
          This is free hosting, so please wait up to a minute for login to
          complete!
        </Text>
      </VStack>
    </form>
  );
};

export default Login;
