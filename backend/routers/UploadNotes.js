// import express from "express";
// import jwt from "jsonwebtoken";
// import cloudinary from "cloudinary";
// import { Notes } from "../Models/Notes.js"; // Ensure proper import
// import multer from "multer";
// import Connect from '../db/Connect.js';
const express = require("express");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary"); // Use `.v2` if required by your Cloudinary configuration
const Notes = require("../Models/Notes.js"); // Ensure proper import
const multer = require("multer");
const Connect = require("../db/Connect.js");

const uploadrouter = express.Router();

// Middleware for verifying JWT token
const verify = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        message: "Token is not Provided"
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Token Verification Error:", error);
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});
uploadrouter.post("/uploadnotes", verify, upload.single("file"), async (req, res) => {
  try {
    await Connect();
    const {
      department,
      year,
      semester,
      subjectName,
      description,
      name,
      phone
    } = req.body;
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    // Upload file to Cloudinary
    let fileUrl;
    try {
      fileUrl = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream({
          folder: "LLB_Website",
          resource_type: "raw"
        }, (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }).end(req.file.buffer);
      });
    } catch (uploadError) {
      console.error("File Upload Error:", uploadError);
      return res.status(500).json({
        message: "File upload failed"
      });
    }

    // Store data in MongoDB
    const newNote = await Notes.create({
      department,
      name,
      phone,
      year,
      semester,
      file: fileUrl,
      // Save Cloudinary URL
      subjectName,
      description
    });
    return res.status(200).json({
      message: "Notes Uploaded Successfully",
      note: newNote
    });
  } catch (error) {
    console.error("Error in Upload:", error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});
uploadrouter.post('/findnotes', verify, async (req, res) => {
  try {
    await Connect();
    const {
      department,
      year,
      semester,
      subjectName
    } = req.body;

    // Debugging: Log the received parameters
    console.log('Received parameters:', {
      department,
      year,
      semester,
      subjectName
    });

    // Query the database for all matching notes
    const notes = await Notes.find({
      department,
      year,
      semester,
      subjectName
    }).lean();

    // Debugging: Log the found notes
    console.log('Found notes:', notes);
    if (notes.length === 0) {
      return res.status(404).json({
        message: 'Sorry, Notes not found'
      });
    }

    // Send the notes back to the frontend
    return res.status(200).json(notes);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'Server Error, Try Again!'
    });
  }
});
uploadrouter.get('/allnotes', async (req, res) => {
  try {
    await Connect();
    const notes = await Notes.find({});
    if (!notes) {
      return res.status(404).json({
        message: 'Notes not found'
      });
    }
    return res.status(200).json(notes);
  } catch (error) {
    console.log(error);
  }
});
uploadrouter.delete('/deletenotes/:id', async (req, res) => {
  try {
    await Connect();
    const {
      id
    } = req.params;
    const notes = await Notes.findById(id);
    if (!notes) {
      return res.status(404).json({
        message: 'Notes Not-Found'
      });
    }
    const publicId = await notes?.file.split('/').pop().split('.')[0];
    await cloudinary.v2.uploader.destroy(`LLB_Website/${publicId}`, {
      resource_type: 'raw'
    });
    await Notes.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Notes deleted successfully'
    });
  } catch (error) {
    console.log(error);
  }
});
// export default uploadrouter;
module.exports = uploadrouter;