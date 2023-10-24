import express from "express"
export const router = express.Router()
import { getAllPosts,
getAllUserPosts,
createPost,
getPost,
editPost,
deletePost,
deleteAccount
} from "../controllers/posts.js"

router.route("/deleteUser").delete(deleteAccount)
router.route("/all").get(getAllUserPosts)
router.route("/new").post(createPost)
router.route("/:id").get(getPost).patch(editPost).delete(deletePost)