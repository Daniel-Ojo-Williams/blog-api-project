import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import "dotenv/config"
import Post from "./Posts.js"

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "Please provide first name"]
  },
  lname: {
    type: String,
    required: [true, "Please provide last name"]
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    unique: [true, "Account with email already exists"],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, "Please provide a password"]
  }
}, {timestamps: true})

userSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.post('findOneAndDelete', async function(doc){
  try {
    
    await Post.deleteMany({authorId: doc._id})
    
  } catch (error) {
    console.log(error.message)
  }
})

userSchema.methods.isMatch = async function(password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.genToken = function(){
  const name = `${this.fname} ${this.lname}`
  const token = jwt.sign({name, userId: this._id}, process.env.JWT_SECRET, {expiresIn: 86400})
  return {name, token}
}


export default mongoose.model("User", userSchema)