import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true, emum: ["male", "female"] },
  profilePic: { type: String, default: "" },
},{timestamps: true});// Add createdAt and updatedAt fields

const User = mongoose.model("User", userSchema);

export default User;
