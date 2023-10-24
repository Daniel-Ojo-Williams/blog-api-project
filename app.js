// @ts-nocheck
import express from "express"
import "express-async-errors";
import "dotenv/config.js"

// import errorHandlers
import {errorHandlerMiddleware} from "./middlewares/errorHandlerMiddleware.js"
import {notFoundError} from "./middlewares/notFoundError.js"

// import DB connection
import { connectDB } from "./db/connectDB.js"

// import routers
import { router as authentication } from "./routes/auth.js"
import { router as postsRouter } from "./routes/posts.js"

// import authorization middleware
import { authorize } from "./middlewares/authorization.js";

// import security middlewares
import helmet from "helmet"
import cors from "cors"
import {rateLimit} from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 request per window (per 15 minutes here)
  standardHeaders: "draft-7",
  legacyHeaders: false
})

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())

app.use(limiter)
app.use(helmet())
app.use(cors())

app.use("/api/v1/auth", authentication)
app.use("/api/v1/posts", authorize, postsRouter)

app.use(notFoundError)
app.use(errorHandlerMiddleware)

const start = async() => {
  try {
    // connect db
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {console.log(`Server listening on ${port}`)})
  } catch (error) {
    console.log(error.message)
  }
}

start()