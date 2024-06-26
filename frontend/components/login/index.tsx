import { useState } from "react";
import { Button, FormControl, Input, VStack } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import useCustomToast from "../custom-hooks/customToast";

const Login = () => {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useCustomToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        <Button colorScheme="blue" type="submit" size="lg">
          Log In
        </Button>
      </VStack>
    </form>
  );
};

export default Login;
