// import mongoose from "mongoose";
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, 'Heading is required']
  },
  statement: {
    type: String,
    required: [true, 'Statement is required']
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});
// export const Posts = mongoose?.models?.Posts || mongoose.model('Posts', postSchema);
module.exports = mongoose.models.Posts || mongoose.model('Posts', postSchema);