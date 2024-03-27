import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    comment_content: {
        type: String,
        required: true,
    },
    article_id: {
        type: Number,
        required: true,
    },
    creator_id: {
        type: Number,
        required: true,
    },
});
export default mongoose.model("Comment", commentSchema);
//# sourceMappingURL=Comment.js.map