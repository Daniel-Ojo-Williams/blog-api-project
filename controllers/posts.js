import User from "../models/User.js"
import Post from "../models/Posts.js"
import { BadRequestError, NotFoundError } from "../errors/custom-errors.js"
import { StatusCodes } from "http-status-codes"
import Posts from "../models/Posts.js";


export const getAllPosts = (req, res) => {
  res.send("All posts")
}

export const getAllUserPosts = async (req, res) => {
  const {userId: authorId} = req.user

  const posts = await Post.find({authorId})

  if (posts.length < 1){
    return res.status(StatusCodes.OK).json({msg: `No post`})
  }

  res.status(StatusCodes.OK).json({posts, count: posts.length})
}

export const createPost = async (req, res) => {
  const {name: authorName, userId: authorId} = req.user
  
  const {title, content} = req.body
  if (!(title && content)){
    throw new BadRequestError("Post title or content can't be empty")
  }

  const user = await User.findOne({_id: authorId})
  if(!user){
    throw new BadRequestError(`Account not found`)
  }
  const post = await Post.create({authorId, authorName, title, content})

  res.status(StatusCodes.OK).json({newPost: post})
}

export const getPost = async (req, res) => {
  const {userId: authorId} = req.user
  const {id: postId} = req.params

  const post = await Posts.findOne({_id: postId, authorId})

  if(!post){
    throw new NotFoundError(`Post with id ${postId} not found.`)
  }

  res.status(StatusCodes.OK).json({post})
}

export const editPost = async (req, res) => {
  const {id: postId} = req.params
  const {  title, content } = req.body
  if(!(title && content)){
    throw new BadRequestError("Include title and content")
  }

  const post = await Post.findOneAndUpdate({_id: postId}, req.body, {new: true})

  if (!post){
    throw new NotFoundError(`Post with id ${postId} not found`)
  }

  res.status(StatusCodes.OK).json({updatedPost: post})
}

export const deletePost = async (req, res) => {
  const {id: postId} = req.params

  const post = await Post.findOneAndDelete({_id: postId})

  if (!post){
    throw new NotFoundError(`Post with id ${postId} not found`)
  }

  res.status(StatusCodes.OK).json({msg: "Success, post deleted"})
}

export const deleteAccount = async (req, res) => {
  const {userId} = req.user
  const user = await User.findOneAndDelete({_id: userId})

  if (!user){
    throw new BadRequestError(`User not found`)
  }
  res.status(StatusCodes.OK).json({msg: `Account deleted successfully`})
}

