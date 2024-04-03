import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment_content: {
    type: String,
    required: true,
  },
  article_header: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Comment", commentSchema);
