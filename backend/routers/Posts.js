// import express from 'express';
// import { Posts } from '../Models/PostModel.js';
// import cloudinary from 'cloudinary';
// import multer from 'multer';
// import Connect from '../db/Connect.js';
const express = require('express');
const  Posts  = require('../Models/PostModel.js');
const cloudinary = require('cloudinary'); // Ensure you use `.v2` if required by your Cloudinary configuration
const multer = require('multer');
const Connect = require('../db/Connect.js');

const postrouter = express.Router();
const store = multer.memoryStorage();
const upload = multer({
  storage: store
});
postrouter.post('/createpost', upload.single('image'), async (req, res) => {
  try {
    await Connect();
    const {
      heading,
      statement
    } = req.body;
    if (!req.file) {
      return res.status(400).json({
        error: "Image file is required"
      });
    }
    try {
      // Uploading image to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream({
          folder: 'LLB_Website',
          resource_type: 'image'
        }, (error, result) => {
          if (error) reject(error);else resolve(result.secure_url);
        });
        uploadStream.end(req.file.buffer);
      });

      // Create Post
      await Posts.create({
        heading,
        statement,
        image: uploadResult
      });
      return res.status(200).json({
        message: 'Post Created Successfully'
      });
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return res.status(500).json({
        error: "Image upload failed"
      });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      error: "Something went wrong"
    });
  }
});
postrouter.get('/getpost', async (req, res) => {
  try {
    await Connect();
    const posts = await Posts.find({});
    if (!posts) {
      return res.status(404).json({
        message: 'No Post is found'
      });
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
});
postrouter.get('/idpost/:id', async (req, res) => {
  const {
    id
  } = req.params;
  try {
    await Connect();
    const post = await Posts.findById(id);
    if (!post) {
      res.status(404).json({
        message: 'Post not found'
      });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
});
postrouter.delete('/deletepost/:id', async (req, res) => {
  const {
    id
  } = req.params;
  try {
    await Connect();
    const post = await Posts.findById(id);
    if (!post) {
      res.status(404).json({
        message: 'Post not found'
      });
    }
    const publicId = post.image.split('/').pop().split('.')[0];
    await cloudinary.v2.uploader.destroy(`LLB_Website/${publicId}`);
    await Posts.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Post Deleted Successfully'
    });
  } catch (error) {
    console.log(error);
  }
});
// export default postrouter;
module.exports = postrouter;