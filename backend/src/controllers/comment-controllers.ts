import { NextFunction, Request, Response } from "express";
import Comment from "../models/Comment.js";

/** THIS IS BEING DONE BY THE /ARTICLES/ ROUTE ALONG WITH ARTICLES GET **/
// const getAllComments = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const comments = await Comment.find();
//     return res.status(200).json({ message: "OK", comments });
//   } catch (error) {
//     console.log(error);
//     return res.status(200).json({ message: "Error", cause: error.message });
//   }
// };

const newComment = async (req: Request, res: Response, next: NextFunction) => {
  //save new comment according to given articleID
  try {
    const { username, articleHeader, commentContent, dateCreated } = req.body;
    const newComment = new Comment({
      username,
      articleHeader,
      commentContent,
      dateCreated,
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

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.body;
    const existingComment = await Comment.findOne({ _id });
    if (!existingComment) return res.status(401).send("Comment doesn't exist.");
    await existingComment.deleteOne();
    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

export { newComment, deleteComment };
