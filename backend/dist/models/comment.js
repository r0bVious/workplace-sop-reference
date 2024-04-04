import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    commentContent: {
        type: String,
        required: true,
    },
    articleHeader: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
    },
});
export default mongoose.model("Comment", commentSchema);
//# sourceMappingURL=Comment.js.map