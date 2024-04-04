import mongoose from "mongoose";
const articleSchema = new mongoose.Schema({
    articleHeader: {
        type: String,
        required: true,
    },
    articleContent: {
        type: String,
        required: true,
    },
});
export default mongoose.model("Article", articleSchema);
//# sourceMappingURL=Article.js.map