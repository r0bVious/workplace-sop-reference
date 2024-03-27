import axios from "axios";

const loginUser = async (username: string, password: string) => {
  const res = await axios.post("/user/login", { username, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to verify authorization.");
  }
  const data = await res.data;
  return data;
};

const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to logout");
  }
  const data = await res.data;
  return data;
};

export { loginUser, checkAuthStatus, logoutUser };
