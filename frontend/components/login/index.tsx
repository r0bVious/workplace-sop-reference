import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import useCustomToast from "../custom-hooks/customToast";

const Login = () => {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useCustomToast();

  const handleSubmit = async () => {
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
    <VStack padding={10}>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          value={username}
          type="text"
          placeholder="enter username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <FormLabel>Password</FormLabel>
        <Input
          value={password}
          type="password"
          placeholder="enter password..."
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleSubmit}>Log-In</Button>
    </VStack>
  );
};

export default Login;
