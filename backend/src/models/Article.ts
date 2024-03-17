import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  article_header: {
    type: String,
    required: true,
  },
  article_content: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Article", articleSchema);
