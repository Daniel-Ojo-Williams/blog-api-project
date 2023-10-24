import { StatusCodes } from "http-status-codes"
import { CustomError } from "../errors/custom-errors.js"


export const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    error: err || "Something went wrong, please try again later"
  }

  if (err instanceof CustomError){
    return res.status(err.statusCode).json({error: err.message})
  }

  if (err.code && err.code === 11000){
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.error = "An account with the email exists already"
  }
  if (err.name === 'CastError'){
    return res.status(400).json({error: `Invalid ${err.path}: ${err.value}`})
    return new Error(`Invalid ${err.path}: ${err.value}`);
  return err;
}
  res.status(customError.statusCode).json({error: customError.error})
}