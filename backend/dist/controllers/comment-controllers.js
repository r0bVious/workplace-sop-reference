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
const newComment = async (req, res, next) => {
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
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
export { newComment };
//# sourceMappingURL=comment-controllers.js.map