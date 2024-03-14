import express from "express";

const app = express();

app.get("/ping", (req, res, next) => {
  return res.send("pong");
});

app.listen(5000, () => console.log("Backend Server Open <3"));
