import Article from "../models/article.js";
const getArticle = async (req, res, next) => {
    //summon chosen article
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
export { getArticle, newArticle };
//# sourceMappingURL=article-controllers.js.map