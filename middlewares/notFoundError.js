import { StatusCodes } from "http-status-codes"

export const notFoundError = (req, res) => {
  console.log("Error")
  res.status(StatusCodes.NOT_FOUND).send("Route does not exist")

}
