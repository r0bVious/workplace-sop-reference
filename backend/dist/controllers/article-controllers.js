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
const getArticle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingArticle = await Article.findOne({ _id: id });
        if (!existingArticle)
            return res.status(401).send("Article doesn't exist.");
        return res.status(200).json({ message: "OK", existingArticle });
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
const editArticle = async (req, res, next) => {
    try {
        const { articleId, articleHeader, articleContent } = req.body;
        const updatedArticle = await Article.findByIdAndUpdate(articleId, { articleHeader, articleContent }, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        return res.status(200).json({ message: "Article updated", updatedArticle });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error", cause: error.message });
    }
};
const deleteArticle = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const existingArticle = await Article.findOne({ _id });
        if (!existingArticle)
            return res.status(401).send("Article doesn't exist.");
        await existingArticle.deleteOne();
        return res.status(200).json({
            message: "OK",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
export { getAllArticlesWithComments, newArticle, deleteArticle, getArticle, editArticle, };
//# sourceMappingURL=article-controllers.js.map