import { StatusCodes } from "http-status-codes";


export class CustomError extends Error {
  constructor(message, statusCode){
    super(message)
  }
}

export class NotFoundError extends CustomError{
  constructor(message){
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

export class BadRequestError extends CustomError{
  constructor(message){
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

export class Unauthorized extends CustomError{
  constructor(message){
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

