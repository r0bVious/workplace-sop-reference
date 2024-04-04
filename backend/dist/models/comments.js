import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  commentContent: {
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
//# sourceMappingURL=comments.js.map
