import Article from "../models/Article.js";
import Comment from "../models/Comment.js";
const getAllArticlesWithComments = async (req, res, next) => {
    try {
        const articles = await Article.find();
        const comments = await Comment.find();
        return res.status(200).json({ message: "OK", articles, comments });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
const newArticle = async (req, res, next) => {
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
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
export { getAllArticlesWithComments, newArticle };
//# sourceMappingURL=article-controllers.js.map