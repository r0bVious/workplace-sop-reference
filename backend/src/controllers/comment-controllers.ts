import { NextFunction, Request, Response } from "express";
import Comment from "../models/Comment.js";

const getComments = async (req: Request, res: Response, next: NextFunction) => {
  //summon comments given the articleID given
};

const newComment = async (req: Request, res: Response, next: NextFunction) => {
  //save new comment according to given articleID

  try {
    const { comment_content } = req.body;
    const newComment = new Comment({
      /* needs USER ID */
      comment_content,
    });
    await newComment.save();
    return res
      .status(200)
      .json({ message: "OK", id: newComment._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

export { getComments, newComment };
