import User from "../models/User.js"
import { BadRequestError, NotFoundError, Unauthorized } from "../errors/custom-errors.js"
import { StatusCodes } from "http-status-codes"


export const register = async (req, res) => {
  const {fname, lname, email, password} = req.body
  if (!fname || !lname || !email || !password){
    throw new BadRequestError("Provide full details before proceeding")
  }
  const user = await User.create(req.body)
  const token = user.genToken()
  res.status(StatusCodes.CREATED).json({user: token})
}

export const login = async (req, res) => {
  const {email, password} = req.body
  if (!email || !password){
    throw new BadRequestError("Provide email and password")
  }
  const user = await User.findOne({email})
  if (!user){
    throw new NotFoundError(`Account with email (${email}), does not exist`)
  }
  const isMatch = user.isMatch(password)
  if (!isMatch){
    throw new Unauthorized(`Invalid Authentication`)
  }
  const token = user.genToken()
  res.status(StatusCodes.OK).json({user: token})
}


