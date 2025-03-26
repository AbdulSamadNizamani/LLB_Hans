// import express from 'express';
// import { Videos } from '../Models/VideoModel.js';
// import multer from 'multer';
// import cloudinary from 'cloudinary';
// import Connect from '../db/Connect.js';
const express = require('express');
const Videos = require('../Models/VideoModel.js');
const multer = require('multer');
const cloudinary = require('cloudinary'); // Use `.v2` if required by Cloudinary
const Connect = require('../db/Connect.js');

const videorouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});
videorouter.post('/videopost', upload.single('video'), async (req, res) => {
  try {
    await Connect();
    const {
      heading,
      statement
    } = req.body;
    if (req.file) {
      try {
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadSteam = cloudinary.v2.uploader.upload_stream({
            folder: 'LLB_Website',
            resource_type: 'video'
          }, (error, result) => {
            if (error) reject(error);
            if (result) resolve(result.secure_url);
          });
          uploadSteam.end(req.file.buffer);
        });
        const video = uploadResult;
        await Videos.create({
          heading,
          statement,
          video: uploadResult
        });
        return res.status(200).json({
          message: 'Video-Post Created Successfully'
        });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
videorouter.get('/getvideopost', async (req, res) => {
  try {
    await Connect();
    const videoget = await Videos.find({}).sort({
      createdAt: -1
    });
    if (!videoget) {
      return res.status(404).json({
        message: 'No Video-Post found'
      });
    }
    return res.status(200).json(videoget);
  } catch (error) {
    console.log(error);
  }
});
//FOR DYNAMIC ROUTES
videorouter.get("/getvideopost/:id", async (req, res) => {
  try {
    await Connect();
    const {
      id
    } = req.params;
    console.log("Received ID:", id); // Debugging step

    const video = await Videos.findById(id); // Assuming MongoDB
    if (!video) {
      return res.status(404).json({
        message: "Video not found"
      });
    }
    res.json(video);
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
});
videorouter.delete('/deletevideo/:id', async (req, res) => {
  try {
    await Connect();
    const {
      id
    } = req.params;
    const post = await Videos.findById(id);
    if (!post) {
      return res.status(404).json({
        message: 'Post could not be found'
      });
    }

    // Extract the Public ID correctly
    const videoUrl = post.video;
    const publicIdMatch = videoUrl.match(/\/upload\/(?:v\d+\/)?(.+?)\./);
    if (!publicIdMatch) {
      return res.status(400).json({
        message: 'Could not extract public ID'
      });
    }
    const publicId = publicIdMatch[1];

    // Delete from Cloudinary
    const result = await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: "video"
    });
    if (result.result !== "ok") {
      return res.status(500).json({
        message: "Failed to delete video from Cloudinary"
      });
    }

    // Delete from database
    await Videos.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});
// export default videorouter;
module.exports = videorouter;