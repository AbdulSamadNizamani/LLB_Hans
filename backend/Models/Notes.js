// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  year: {
    type: String,
    required: [true, 'Year is required']
  },
  semester: {
    type: String,
    required: [true, 'Semester is required']
  },
  subjectName: {
    type: String,
    required: [true, 'SubjectName is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  phone: {
    type: Number,
    required: [true, 'Phone Number is required']
  },
  file: {
    type: String,
    required: [true, 'File is required']
  }
}, {
  timestamps: true
});
// export const Notes = mongoose?.models?.Notes || mongoose.model('Notes', uploadSchema);
module.exports = mongoose.models.Notes || mongoose.model('Notes', uploadSchema);