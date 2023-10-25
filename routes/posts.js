import express from "express"
export const router = express.Router()
import { getAllUserPosts,
createPost,
getPost,
editPost,
deletePost,
deleteAccount
} from "../controllers/posts.js"

router.route("/deleteUser").delete(deleteAccount)
router.route("/").get(getAllUserPosts)
router.route("/").post(createPost)
router.route("/:id").get(getPost).patch(editPost).delete(deletePost)