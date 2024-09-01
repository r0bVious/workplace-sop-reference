import {
  FormControl,
  FormLabel,
  Text,
  Button,
  Input,
  Box,
  Card,
  CardBody,
  Stack,
  Switch,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import {
  getUsers,
  deleteUser,
  createUser,
} from "../../helpers/api-communicator.ts";
import useCustomToast from "../custom-hooks/customToast.ts";

interface User {
  _id: string;
  position: string;
  username: string;
}

interface UserEditorProps {
  handleAdminModeChange: (mode: string) => void;
  isMobile?: boolean;
}

const UserEditor: React.FC<UserEditorProps> = ({
  handleAdminModeChange,
  isMobile,
}) => {
  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputPosition, setInputPosition] = useState("");
  const [inputAdminPriv, setInputAdminPriv] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const {
    isOpen: isDeleteAlertOpen,
    onOpen: openDeleteAlert,
    onClose: closeDeleteAlert,
  } = useDisclosure();
  const [userToDeleteId, setUserToDeleteId] = useState("");
  const toast = useCustomToast();

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };
  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  };
  const handleInputPosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPosition(e.target.value);
  };
  const handleInputAdminPriv = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAdminPriv(e.target.checked);
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      const users = response.users;
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteClick = async (inUserId: string) => {
    setUserToDeleteId(inUserId);
    openDeleteAlert();
  };

  const handleCancelDelete = () => {
    closeDeleteAlert();
    setUserToDeleteId("");
  };

  const handleSubmit = async () => {
    try {
      await createUser(inputName, inputPosition, inputPassword, inputAdminPriv);
      toast({
        title: "New user created!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      fetchUsers();
      setInputName("");
      setInputPassword("");
      setInputPosition("");
      setInputAdminPriv(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Cannot create new user.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleConfirmDelete = async () => {
    try {
      closeDeleteAlert();
      await deleteUser(userToDeleteId);
      toast({
        title: "User deleted!",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast({
        title: "Cannot delete user.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const leastDestructiveRef = useRef<HTMLElement | null>(null);

  return (
    <div>
      <Button
        colorScheme="red"
        size="lg"
        alignSelf="flex-start"
        onClick={() => handleAdminModeChange("")}
        marginTop={2}
        ml={5}
      >
        Go Back
      </Button>
      <Text
        fontWeight="bold"
        textDecoration="underline"
        fontSize="xl"
        textAlign={"center"}
      >
        Create New User
      </Text>
      <FormControl
        p={5}
        display="flex"
        flexDirection="column"
        bgColor="gray.200"
        maxWidth={isMobile ? "95%" : "50%"}
        borderRadius={10}
        mx={"auto"}
      >
        <FormLabel>New User's Username:</FormLabel>
        <Input
          type="text"
          value={inputName}
          onChange={handleInputName}
          bgColor={"white"}
        />
        <FormLabel>New User's Password:</FormLabel>
        <Input
          type="password"
          value={inputPassword}
          onChange={handleInputPassword}
          bgColor={"white"}
        />
        <Stack display="flex" flexDirection="row">
          <Box>
            <FormLabel>New User's Position:</FormLabel>
            <Input
              type="text"
              value={inputPosition}
              onChange={handleInputPosition}
              bgColor={"white"}
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <FormLabel>Administrator:</FormLabel>
            <Switch
              alignSelf="center"
              size={"lg"}
              isChecked={inputAdminPriv}
              onChange={handleInputAdminPriv}
            />
          </Box>
        </Stack>
        <Button
          onClick={handleSubmit}
          width="100%"
          colorScheme={"blue"}
          maxWidth="25rem"
          alignSelf={"center"}
          mt={5}
        >
          Save New User
        </Button>
      </FormControl>

      <Text
        margin={"2rem 0 0.5rem"}
        fontWeight="bold"
        textDecoration="underline"
        fontSize="xl"
        textAlign="center"
      >
        Delete Existing Users
      </Text>
      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          md: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
        gridGap={5}
        justifyContent="center"
        mx={5}
        paddingBottom={5}
      >
        {users.map((user) => {
          return (
            <Card
              key={user._id}
              bgColor={"gray.200"}
              borderRadius={"md"}
              boxShadow={"md"}
              width="100%"
            >
              <CardBody display="flex" justifyContent="space-between">
                <Stack>
                  <Text fontWeight="bold">{user.username}</Text>
                  <Text as="em">{user.position}</Text>
                </Stack>
                <Button
                  colorScheme={"red"}
                  onClick={() => handleDeleteClick(user._id)}
                  alignSelf="center"
                >
                  Delete
                </Button>
              </CardBody>
            </Card>
          );
        })}
        <AlertDialog
          isOpen={isDeleteAlertOpen}
          leastDestructiveRef={
            leastDestructiveRef as React.MutableRefObject<HTMLElement | null>
          }
          onClose={closeDeleteAlert}
        >
          <AlertDialogOverlay>
            <AlertDialogContent maxW="sm">
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete User
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this user?
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
      </Box>
    </div>
  );
};

export default UserEditor;
