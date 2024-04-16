import { Request, Response, NextFunction } from "express";
import Article from "../models/Article.js";
import Comment from "../models/Comment.js";

const getAllArticlesWithComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articles = await Article.find();
    const comments = await Comment.find();
    return res.status(200).json({ message: "OK", articles, comments });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

const newArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { articleHeader, articleContent } = req.body;
    const newArticle = new Article({
      articleHeader,
      articleContent,
    });
    await newArticle.save();
    return res
      .status(200)
      .json({ message: "OK", id: newArticle._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

const deleteArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.body;
    const existingArticle = await Article.findOne({ _id });
    if (!existingArticle) return res.status(401).send("Article doesn't exist.");
    await existingArticle.deleteOne();
    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

export { getAllArticlesWithComments, newArticle, deleteArticle };
