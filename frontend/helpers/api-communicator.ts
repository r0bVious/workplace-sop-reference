import axios from "axios";

const getUsers = async () => {
  const res = await axios.get("/user");
  if (res.status !== 200) {
    throw new Error("Unable to retrieve users.");
  }
  const data = await res.data;
  return data;
};

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

const getArticle = async (articleId: String) => {
  const res = await axios.get(`articles/article/${articleId}`);
  if (res.status !== 200) {
    throw new Error("Unable to retrieve article");
  }
  const data = await res.data;
  return data;
};

const editArticle = async (
  articleId: String,
  articleHeader: String,
  articleContent: String
) => {
  const res = await axios.post("/articles/edit", {
    articleId,
    articleHeader,
    articleContent,
  });
  if (res.status !== 200) {
    throw new Error("Unable to edit existing article");
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

const newArticle = async (articleHeader: String, articleContent: String) => {
  const res = await axios.post("/articles/newarticle", {
    articleHeader,
    articleContent,
  });
  if (res.status !== 200) {
    throw new Error("Unable to send comment");
  }
  const data = await res.data;
  return data;
};

const deleteUser = async (_id: string) => {
  const res = await axios.post("/user/delete", {
    _id,
  });
  if (res.status !== 200) {
    throw new Error("Unable to delete user");
  }
  const data = await res.data;
  return data;
};

const createUser = async (
  username: string,
  position: string,
  password: string,
  adminPriv = true
) => {
  const res = await axios.post("/user/create", {
    username,
    position,
    password,
    adminPriv,
  });
  if (res.status !== 201) {
    throw new Error("Unable to create new user");
  }
  const data = await res.data;
  return data;
};

const deleteArticle = async (_id: string) => {
  const res = await axios.post("/articles/delete", {
    _id,
  });
  if (res.status !== 200) {
    throw new Error("Unable to delete article");
  }
  const data = await res.data;
  return data;
};

const deleteComment = async (_id: string) => {
  const res = await axios.post("/comments/delete", {
    _id,
  });
  if (res.status !== 200) {
    throw new Error("Unable to delete comment");
  }
  const data = await res.data;
  return data;
};

const getComments = async (params: { articleHeader: string }) => {
  const res = await axios.get("/comments", { params });
  if (res.status !== 200) {
    throw new Error("Unable to retrieve comments");
  }
  const data = await res.data;
  return data;
};

export {
  getUsers,
  loginUser,
  checkAuthStatus,
  logoutUser,
  getArticles,
  newComment,
  newArticle,
  deleteUser,
  createUser,
  deleteArticle,
  deleteComment,
  getComments,
  getArticle,
  editArticle,
};
