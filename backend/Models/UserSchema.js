// import mongoose from "mongoose";
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  googleId: {
    type: String
  },
  name: {
    type: String,
    required: [true, 'Name is Required']
  },
  email: {
    type: String,
    required: [true, 'Email is Required']
  },
  image: String,
  password: {
    type: String
  },
  role: {
    type: String,
    enum: ["User", "Manager", "Admin"],
    default: "User"
  }
}, {
  timestamps: true
});
// export const User = mongoose?.models?.User || mongoose.model('User', userSchema);
 module.exports = mongoose.models.User || mongoose.model('User', userSchema);