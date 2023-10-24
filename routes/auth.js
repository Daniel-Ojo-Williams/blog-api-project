import express from "express"
import { register, login } from "../controllers/auth.js"

export const router = express.Router()

router.route("/login").post(login)
router.route("/register").post(register)
