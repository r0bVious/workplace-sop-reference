import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    //here login logic to backend
  };

  return (
    <VStack padding={10}>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          value={username}
          type="text"
          placeholder="enter username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormLabel>Password</FormLabel>
        <Input
          value={password}
          type="password"
          placeholder="enter password..."
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleLogin}>Log-In</Button>
    </VStack>
  );
};

export default Login;
