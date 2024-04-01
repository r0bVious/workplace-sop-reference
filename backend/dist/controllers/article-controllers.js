import Article from "../models/Article.js";
const getAllArticles = async (req, res, next) => {
    try {
        const articles = await Article.find();
        return res.status(200).json({ message: "OK", articles });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
const newArticle = async (req, res, next) => {
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
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
export { getAllArticles, newArticle };
//# sourceMappingURL=article-controllers.js.map