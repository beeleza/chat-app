import mongoose from "express";

const userSchema = new mongoose.Shema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  profilePic: {
    type: String,
    default: "",
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
