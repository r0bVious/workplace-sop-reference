import {
  FormControl,
  FormHelperText,
  FormLabel,
  CloseButton,
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
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  getUsers,
  deleteUser,
  createUser,
} from "../../helpers/api-communicator.ts";

interface User {
  _id: string;
  position: string;
  username: string;
}

const UserEditor = ({ handleAdminModeChange }) => {
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

  const handleInputName = (e) => {
    setInputName(e.target.value);
  };
  const handleInputPassword = (e) => {
    setInputPassword(e.target.value);
  };
  const handleInputPosition = (e) => {
    setInputPosition(e.target.value);
  };
  const handleInputAdminPriv = (e) => {
    setInputAdminPriv(e.target.checked);
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers(); //here is where you'd swap functions for a more secure GET from the back
      const users = response.users;
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteClick = async (inUserId) => {
    setUserToDeleteId(inUserId);
    openDeleteAlert();
  };

  const handleCancelDelete = () => {
    closeDeleteAlert();
    setUserToDeleteId("");
  };

  const handleSubmit = async () => {
    try {
      toast.loading("Saving new user(s)...", { id: "user" });
      await createUser(inputName, inputPosition, inputPassword, inputAdminPriv);
      toast.success("New user saved!", { id: "user" });
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Error: Data not saved to database.", { id: "user" });
    }
  };

  const handleConfirmDelete = async () => {
    try {
      closeDeleteAlert();
      toast.loading("Deleting user from database...", { id: "user" });
      await deleteUser(userToDeleteId);
      toast.success("User deleted!", { id: "user" });
      console.log("click");
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Error: User unable to be removed from database.", {
        id: "user",
      });
    }
  };

  return (
    <>
      <FormControl p={5} display="flex" flexDirection="column">
        <CloseButton
          size="lg"
          alignSelf="flex-end"
          onClick={() => handleAdminModeChange(null)}
        />
        <Text>User Editor</Text>
        <FormHelperText marginBottom={5}>
          This is where you can add or remove users.
        </FormHelperText>
        <Text>Create New User</Text>
        <FormLabel>New User's Username:</FormLabel>
        <Input type="text" value={inputName} onChange={handleInputName} />
        <FormLabel>New User's Password:</FormLabel>
        <Input
          type="password"
          value={inputPassword}
          onChange={handleInputPassword}
        />
        <Stack display="flex" flexDirection="row">
          <Box>
            <FormLabel>New User's Position:</FormLabel>
            <Input
              type="text"
              value={inputPosition}
              onChange={handleInputPosition}
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
        <Button onClick={handleSubmit} width="100%">
          Save New User
        </Button>
      </FormControl>
      <Box>
        {users.map((user) => {
          return (
            <Card key={user._id}>
              <CardBody display="flex" justifyContent="space-between">
                <Stack>
                  <Text fontWeight="bold">{user.username}</Text>
                  <Text as="em">{user.position}</Text>
                </Stack>
                <Button
                  colorScheme={"red"}
                  onClick={() => handleDeleteClick(user._id)}
                >
                  Delete
                </Button>
              </CardBody>
            </Card>
          );
        })}
        <AlertDialog
          isOpen={isDeleteAlertOpen}
          leastDestructiveRef={null}
          onClose={closeDeleteAlert}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
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
    </>
  );
};

export default UserEditor;
