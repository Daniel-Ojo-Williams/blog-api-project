import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  authorName: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
}, { timestamps: true })


export default mongoose.model("Post", postSchema)