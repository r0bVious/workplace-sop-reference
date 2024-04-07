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

const getArticles = async () => {
  const res = await axios.get("/articles");
  if (res.status !== 200) {
    throw new Error("Unable to retrieve articles");
  }
  const data = await res.data;
  return data;
};

const newComment = async (
  username: String,
  articleHeader: String,
  commentContent: String,
  dateCreated: Date
) => {
  const res = await axios.post("/comments/newcomment", {
    username,
    articleHeader,
    commentContent,
    dateCreated,
  });
  if (res.status !== 200) {
    throw new Error("Unable to send comment");
  }
  const data = await res.data;
  return data;
};

export { loginUser, checkAuthStatus, logoutUser, getArticles, newComment };
