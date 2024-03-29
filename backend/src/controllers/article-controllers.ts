import { Request, Response, NextFunction } from "express";
import Article from "../models/Article.js";

const getArticle = async (req: Request, res: Response, next: NextFunction) => {
  //summon chosen article
};

const newArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { article_header, article_content } = req.body;
    const newArticle = new Article({
      article_header,
      article_content,
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

export { getArticle, newArticle };
