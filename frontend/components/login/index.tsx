import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      toast.loading("Logging In...", { id: "login" });
      await auth?.login(username, password);
      toast.success("Login Successful.", { id: "login" });
    } catch (error) {
      console.log("Error:", error);
      toast.error("Login Failed.", { id: "login" });
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
