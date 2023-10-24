import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
  commenter: String,
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "Post"
  }
}, { timestamps: true })