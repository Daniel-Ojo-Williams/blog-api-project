import jwt from "jsonwebtoken"
import "dotenv/config.js"
import { Unauthorized } from "../errors/custom-errors.js"


export const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")){
    throw new Unauthorized("Not authorized to access this route")
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded

    next()

  } catch (error) {
    throw new Unauthorized("Invalid authentication")
  }
}