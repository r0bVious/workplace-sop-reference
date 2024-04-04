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
    const { username, commentContent, articleHeader, adminPriv } = req.body;
    const newComment = new Comment({
      username,
      commentContent,
      articleHeader, //maybe this should be the article id, though it might be nice to be so obvious in the db given that this project is fairly static
      adminPriv,
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

export { newComment };
