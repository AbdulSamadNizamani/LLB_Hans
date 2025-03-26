// import mongoose from "mongoose";
const mongoose = require('mongoose')
const videoSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, 'Heading is required']
  },
  statement: {
    type: String,
    required: [true, 'Statement is required']
  },
  video: {
    type: String
  }
}, {
  timestamps: true
});
// export const Videos = mongoose?.models?.Videos || mongoose.model('Videos', videoSchema);
 module.exports = mongoose.models.Videos || mongoose.model('Videos', videoSchema);