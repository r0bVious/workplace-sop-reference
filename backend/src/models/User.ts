import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin_priv: {
    type: Boolean,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
